import { genreSeriesModel } from "../models/index.js";

export const genreSeriesService = {
    getAll: async (page, limit, sortBy, order) => {
        const skip = (page - 1) * limit;
        let sortOrder;
        if (order === "asc") {
          sortOrder = 1;
        } else {
          sortOrder = -1;
        }
        const data = await genreSeriesModel.find()
          .sort({ [sortBy]: sortOrder })
          .skip(skip)
          .limit(limit);
        return data;
      },
      getById: async (id) => {
        return genreSeriesModel.findById(id);
      },
      add: async (body) => {
        return genreSeriesModel.create(body);
      },
      update: async (id, body) => {
        return genreSeriesModel.findByIdAndUpdate(id, body);
      },
      delete: async (id) => {
        return genreSeriesModel.findByIdAndDelete(id);
      },
};