import { seriesModel } from "../models/seriesModel.js";
import { seasonModel } from "../models/seasonModel.js";
import { episodeModel } from "../models/episodeModel.js";
import { httpResponse } from "../utils/httpResponse.js"

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
  add: async (body) => {
    return seriesModel.create(body);
  },
  update: async (id, body) => {
    return seriesModel.findByIdAndUpdate(id, body);
  },
  delete: async (id) => {
    return seriesModel.findByIdAndDelete(id);
  },
  getAllSeasonsOfSeriesBySeriesId: async (id) => {
    return seasonModel.find({ series_id: id });
  },
  getAllEpisodesOfSeriesBySeriesId: async (id) => {
    const season = await seasonModel.findOne({ series_id: id });
    if (!season) {
      return httpResponse.NOT_FOUND("Season not found");
    }
    const episodes = await episodeModel.find({ season_id: season._id });

    if (!episodes || episodes.length === 0) {
      return httpResponse.NOT_FOUND("No episodes found for this season");
    }
    return episodes;
  },
};
