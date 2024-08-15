import { genreService } from "../services/index.js";
import { httpResponse } from "../utils/index.js"

export const genreController = {
    add: async (req, res) => {
        try {
            const data = await genreService.add(req.body);
            return httpResponse.CREATED(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    getAll: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sortBy || "createdAt";
            const order = req.query.order || "asc";
            const data = await genreService.getAll(page, limit, sortBy, order);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "Data not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    getById: async (req, res) => {
        try {
            const data = await genreService.getById(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "Genre not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    update: async (req, res) => {
        try {
            const data = await genreService.update(req.params.id, req.body);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "Genre not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    delete: async (req, res) => {
        try {
            const data = await genreService.delete(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "Genre not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    getAllSeriesByGenreId: async (req, res) => {
        try {
            const data = await genreService.getAllSeriesByGenreId(req.params.id);
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    getAllSeasonOfAllSeriesByGenreId: async (req, res) => {
        try {
            const data = await genreService.getAllSeasonOfAllSeriesByGenreId(
                req.params.id
            );
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },

};