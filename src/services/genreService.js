import mongoose from "mongoose";
import { genreModel} from "../models/index.js";
import { genreSeriesModel } from "../models/index.js";

export const genreService = {
    add: async (body) =>{
        return genreModel.create(body);
    },
    getAll: async (page, limit, sortBy, order) => {
		const skip = (page - 1) * limit;
		let sortOrder;
		if(order === "asc"){
			sortOrder = 1;
		} else {
			sortOrder = -1;
		}
		const data = await genreModel.find().sort({ [sortBy]: sortOrder}).skip(skip).limit(limit);
		return data;
	},
    getById: async (id) =>{
        return genreModel.findById(id);
    },
    update: async (id,body) =>{
        return genreModel.findByIdAndUpdate(id,body, { new: true});
    },
    delete: async (id) =>{
      const data = await genreModel.findByIdAndDelete(id);
      if (!data) {
        throw new Error('Genre not found');
      }
      await genreSeriesModel.deleteMany({ genre_id: id });
  
      return data;
    },
    getAllSeriesByGenreId: async (id) =>{
      return genreModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id)
          },
        },
        {
          $lookup: {
            from: "genreSeries",
            localField: "_id",
            foreignField: "genre_id",
            pipeline: [
              {
              $lookup: {
                from: "series",
                localField: "series_id",
                foreignField: "_id",
                as: "series",
              },
              },
              {
                $unwind: "$series"
              }
            ],
            as: "genreSeries",
            },
        },
        {
          $unwind: "$genreSeries",
        }
      ]);
    },
    getAllSeasonOfAllSeriesByGenreId: async (id) => {
        return genreModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(id)
            },
          },
          {
            $lookup: {
              from: "genreSeries",
              localField: "_id",
              foreignField: "genre_id",
              pipeline: [
                {
                $lookup: {
                  from: "series",
                  localField: "series_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $lookup: {
                        from: "seasons",
                        localField: "_id",
                        foreignField: "series_id",
                        as: "seasons",
                      }
                    },
                    {
                      $unwind: "$seasons",
                    }
                  ],
                  as: "series",
                },
                },
                {
                  $unwind: "$series",
                }
              ],
              as: "genreSeries",
              },
          },
          {
            $unwind: "$genreSeries",
          }
        ])
      },

}