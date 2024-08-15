import { fileModel } from "../models/index.js";

export const fileService = {
    
    getAll: async (page, limit, sortBy, order) => {
        const skip = (page - 1) * limit;
        let sortOrder;
        if (order === "asc") {
          sortOrder = 1;
        } else {
          sortOrder = -1;
        }
        const data = await fileModel.find()
          .sort({ [sortBy]: sortOrder })
          .skip(skip)
          .limit(limit);
        return data;
      },
      getById: async (id) => {
        return fileModel.findById(id);
      },
      add: async (body) => {
        return fileModel.create(body);
      },
      update: async (id, body) => {
        return fileModel.findByIdAndUpdate(id, body);
      },
      delete: async (id) => {
        return fileModel.findByIdAndDelete(id);
      },
};