import { seasonModel } from "../models/index.js";
import { episodeModel } from "../models/index.js";

export const seasonService = {
    
    getAll: async (page, limit, sortBy, order) => {
        const skip = (page - 1) * limit;
        let sortOrder;
        if (order === "asc") {
          sortOrder = 1;
        } else {
          sortOrder = -1;
        }
        const data = await seasonModel.find()
          .sort({ [sortBy]: sortOrder })
          .skip(skip)
          .limit(limit);
        return data;
      },
      getById: async (id) => {
        return seasonModel.findById(id);
      },
      add: async (body) => {
        return seasonModel.create(body);
      },
      update: async (id, body) => {
        return seasonModel.findByIdAndUpdate(id, body);
      },
      delete: async (id) => {
        return seasonModel.findByIdAndDelete(id);
      },
      getAllEpisodesOfseasonBySeasonId: async (id) =>{
        return episodeModel.find({ season_id: id});
      },
};