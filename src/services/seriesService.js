import mongoose from "mongoose";
import { seriesModel } from "../models/seriesModel.js";
import { genreSeriesModel } from "../models/genreSeriesModel.js";
import { seasonModel } from "../models/seasonModel.js";

export const seriesService = {
  getAll: async (page, limit, sortBy, order) => {
    const skip = (page - 1) * limit;
    let sortOrder;
    if (order === "asc") {
      sortOrder = 1;
    } else {
      sortOrder = -1;
    }
    const data = await seriesModel.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    return data;
  },
  getById: async (id) => {
    return seriesModel.findById(id);
  },
  add: async (data) => {
    const { name, description, trailer_id, thumbnail_id, genre_ids } = data;

    const result = await seriesModel.create({ name, description, trailer_id, thumbnail_id });

    if (genre_ids && genre_ids.length > 0) {
      const genreSeriesData = genre_ids.map(genreId => ({
        genre_id: genreId,
        series_id: result._id
      }));
      await genreSeriesModel.insertMany(genreSeriesData);
    }

    return result;
  },
  update: async (id, data) => {
    const { title, description, trailer_id, thumbnail_id, genre_ids } = data;

    const result = await seriesModel.findByIdAndUpdate(id, { title, description, trailer_id, thumbnail_id }, { new: true });

    if (genre_ids) {

      await genreSeriesModel.deleteMany({ series_id: id });

      const genreSeriesData = genre_ids.map(genreId => ({
        genre_id: genreId,
        series_id: id
      }));
      await genreSeriesModel.insertMany(genreSeriesData);
    }

    return result;
  },
  delete: async (id) => {
    const data = await seriesModel.findByIdAndDelete(id);
    if (!data) {
      throw new Error('Series not found');
    }
    await genreSeriesModel.deleteMany({ series_id: id });
    await seasonModel.deleteMany({ series_id: id});

    return data;
  },
  getAllSeasonsOfSeriesBySeriesId: async (id) => {
    return seriesModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id)
				},
			},
			{
				$lookup: {
					from: "seasons",
					localField: "_id",
					foreignField: "series_id",
					as: "seasons",
				},
			},
      {
        $unwind: "$seasons",
      },
		])
  },
  getAllEpisodesOfSeriesBySeriesId: async (id) => {
    return seriesModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        },
      },
      {
        $lookup: {
          from: "seasons",
          localField: "_id",
          foreignField: "series_id",
          pipeline: [
            {
            $lookup: {
              from: "episodes",
              localField: "_id",
              foreignField: "season_id",
              as: "episodes",
            },
            },
            {
              $unwind: "$episodes"
            }
          ],
          as: "seasons",
          },
      },
      {
        $unwind: "$seasons",
      }
    ]);
  },
};
