import mongoose from "mongoose";
import { episodeModel } from "../models/index.js";

export const episodeService = {
    
    getAll: async (page, limit, sortBy, order) => {
        const skip = (page - 1) * limit;
        let sortOrder;
        if (order === "asc") {
          sortOrder = 1;
        } else {
          sortOrder = -1;
        }
        const data = await episodeModel.find()
          .sort({ [sortBy]: sortOrder })
          .skip(skip)
          .limit(limit);
        return data;
      },
      getById: async (id) => {
        return episodeModel.findById(id);
      },
      add: async (body) => {
        return episodeModel.create(body);
      },
      update: async (id, body) => {
        return episodeModel.findByIdAndUpdate(id, body);
      },
      delete: async (id) => {
        return episodeModel.findByIdAndDelete(id);
      },
      getStreamsOfEpisodeByEpisodeId: async (id) =>{
        return episodeModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(id)
            },
          },
          {
            $lookup: {
              from: "streams",
              localField: "_id",
              foreignField: "episode_id",
              as: "streams",
            },
          },
          {
            $unwind: "$streams",
          },
        ])
      },
};