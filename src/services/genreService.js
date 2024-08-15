import { genreModel} from "../models/index.js";
import { genreSeriesModel } from "../models/index.js";
import { seriesModel } from "../models/index.js";
import { seasonModel } from "../models/index.js";

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
        return genreModel.findByIdAndDelete(id);
    },
    getAllSeriesByGenreId: async (id) =>{
        const genre = await genreModel.findById(id);
        if(!genre) {
            return "Genre not found";
        }
        const genreSeries = await genreSeriesModel.find({genre_id: id});
        if(!genreSeries) {
            return "Genre series not found";
        }
        const seriesId = genreSeries[0].series_id;
        const series = await seriesModel.findById(seriesId);
        if(!series) {
            return "Series not found";
        }
        return series;
    },
    getAllSeasonOfAllSeriesByGenreId: async (id) => {
        const genre = await genreModel.findById(id);
        if (!genre) {
          return "Genre not found";
        }
        const genre_series = await genreSeriesModel.find({ genre_id: id });
        if (!genre_series) {
          return "Genre series not found";
        }
        const seriesId = genre_series[0].series_id;
        const series = await seriesModel.findById(seriesId);
        if (!series) {
          return "Series not found";
        }
        const seasons = await seasonModel.find({ series_id: series._id });
        if (!seasons) {
          return "Seasons not found";
        }
        return seasons;
      },
    

}