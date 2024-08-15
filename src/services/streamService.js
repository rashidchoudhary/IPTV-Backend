import { streamModel } from "../models/index.js";
import { seasonModel } from "../models/index.js";
import { seriesModel } from "../models/index.js";
import { genreModel } from "../models/index.js";
import { genreSeriesModel } from "../models/index.js";
import { episodeModel } from "../models/index.js";

export const streamService = {
    
    getAll: async (page, limit, sortBy, order) => {
        const skip = (page - 1) * limit;
        let sortOrder;
        if (order === "asc") {
          sortOrder = 1;
        } else {
          sortOrder = -1;
        }
        const data = await streamModel.find()
          .sort({ [sortBy]: sortOrder })
          .skip(skip)
          .limit(limit);
        return data;
      },
      getById: async (id) => {
        return streamModel.findById(id);
      },
      add: async (body) => {
        return streamModel.create(body);
      },
      update: async (id, body) => {
        return streamModel.findByIdAndUpdate(id, body);
      },
      delete: async (id) => {
        return streamModel.findByIdAndDelete(id);
      },
      getEpisodeOfStreamByStreamId: async (id) =>{
        return streamModel.findById(id).populate("episode_id");
      },
      getUserOfStreamByStreamId: async (id) =>{
        return streamModel.findById(id).populate("user_id");
      },
      getSeasonOfEpisodeOfStreamByStreamId: async (id) =>{
        const stream = await streamModel.findById(id);
        if(!stream) {
            return "Stream not found";
        }
        const episode = await episodeModel.findById(stream.episode_id);
        if(!episode) {
            return "Episode not found";
        }
        const season = await seasonModel.findById(episode.season_id);
        if(!season) {
            return "Season not found";
        }
        return season;
      },
      getSeriesOfSeasonOfEpisodeofStreamByStreamId: async(id) =>{
        const stream = await streamModel.findById(id);
        if(!stream) {
            return "Stream not found";
        }
        const episode = await episodeModel.findById(stream.episode_id);
        if(!episode) {
            return "Episode not found";
        }
        const season = await seasonModel.findById(episode.season_id);
        if(!season) {
            return "Season not found";
        }
        const series = await seriesModel.findById(season.series_id);
        if(!series) {
            return "Series not found";
        }
        return series;
      },
      getGenreOfSeriesOfSeasonOfEpisodeOfStreamByStreamId: async (id) => {
        const stream = await streamModel.findById(id);
        if (!stream) {
          return "Stream not found";
        }
        const episode = await episodeModel.findById(stream.episode_id);
        if (!episode) {
          return "Episode not found";
        }
        const season = await seasonModel.findById(episode.season_id);
        if (!season) {
          return "Season not found";
        }
        const series = await seriesModel.findById(season.series_id);
        if (!series) {
          return "Series not found";
        }
        const genreSeries = await genreSeriesModel.findOne({
          series_id: series._id,
        });
        if (!genreSeries) {
          return "GenreSeries not found";
        }
        const genre = await genreModel.findOne({ series_id: series._id });
        if (!genre) {
          return "Genre not found";
        }
        return genre;
      },

};