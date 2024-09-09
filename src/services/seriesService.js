import mongoose from "mongoose";
import { seriesModel } from "../models/seriesModel.js";
import { genreSeriesModel } from "../models/genreSeriesModel.js";
import { fileModel } from "../models/index.js";
import { seasonModel } from "../models/index.js";
import fs from 'fs';
import path from 'path';

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
  add: async (data, file) => {
    const { name, description } = data;
    let { genre_ids } = data;

    if (Array.isArray(genre_ids)) {
        try {
            genre_ids = genre_ids.map(id => mongoose.Types.ObjectId(id));
        } catch (err) {
            throw new Error('Invalid ObjectId format in genre_ids');
        }
    } else if (typeof genre_ids === 'string') {
        try {
            genre_ids = JSON.parse(genre_ids);
            genre_ids = genre_ids.map(id => mongoose.Types.ObjectId(id));
        } catch (err) {
            throw new Error('Invalid genre_ids format');
        }
    } else {
        throw new Error('Invalid genre_ids format');
    }

    const fileData = await fileModel.create({
        original_name: file.originalname,
        current_name: file.filename,
        type: file.mimetype,
        path: file.path,
        size: file.size,
    });

    const series = await seriesModel.create({
        name,
        description,
        trailer_id: fileData._id,
        thumbnail_id: fileData._id,
        genre_ids,
    });

    if (genre_ids && genre_ids.length > 0) {
        const genreSeriesData = genre_ids.map((genreId) => ({
            genre_id: genreId,
            series_id: series._id,
        }));
        await genreSeriesModel.insertMany(genreSeriesData);
    }

    return series;
},

update: async (id, data, file) => {
    const { name, description } = data;
    let { genre_ids } = data;

    if (Array.isArray(genre_ids) && genre_ids.length === 1 && typeof genre_ids[0] === 'string') {
        try {
            genre_ids = JSON.parse(genre_ids[0]);
            genre_ids = genre_ids.map(id => mongoose.Types.ObjectId(id));
        } catch (err) {
            throw new Error('Invalid genre_ids format');
        }
    } else if (!Array.isArray(genre_ids)) {
        throw new Error('Invalid genre_ids format');
    }

    const existingSeries = await seriesModel.findById(id);
    if (!existingSeries) {
        throw new Error('Series not found');
    }

    const updatedData = {
        name,
        description,
        genre_ids,
    };

    if (file) {
        const oldFile = await fileModel.findById(existingSeries.thumbnail_id);

        if (oldFile && oldFile.path) {
            const oldFilePath = path.join(process.cwd(), oldFile.path);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        await fileModel.findByIdAndDelete(existingSeries.thumbnail_id);

        const fileData = await fileModel.create({
            original_name: file.originalname,
            current_name: file.filename,
            type: file.mimetype,
            path: file.path,
            size: file.size,
        });

        updatedData.trailer_id = fileData._id;
        updatedData.thumbnail_id = fileData._id;
    }

    const series = await seriesModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (genre_ids && genre_ids.length > 0) {
        await genreSeriesModel.deleteMany({ series_id: id });

        const genreSeriesData = genre_ids.map((genreId) => ({
            genre_id: genreId,
            series_id: series._id,
        }));
        await genreSeriesModel.insertMany(genreSeriesData);
    }

    return series;
},

  delete: async (id) => {
    const series = await seriesModel.findById(id);
    if (!series) {
      throw new Error('Series not found');
    }

    const trailerId = series.trailer_id;

    const fileData = await fileModel.findByIdAndDelete(trailerId);
    if (fileData) {
      const filePath = path.join("public", fileData.current_name);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    await seriesModel.findByIdAndDelete(id);

    await genreSeriesModel.deleteMany({ series_id: id });

    await seasonModel.deleteMany({ series_id: id });

    return series;
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
