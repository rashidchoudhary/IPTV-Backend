import { episodeService } from "../services/index.js";
import { httpResponse } from "../utils/httpResponse.js";

export const episodeController = {

    getAll: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sortBy || "createdAt";
            const order = req.query.order || "asc";
            const data = await episodeService.getAll(page, limit, sortBy, order);
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
            const data = await episodeService.getById(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "Episode not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    add: async (req, res) => {
        try {
            const data = await episodeService.add(req.body);
            return httpResponse.CREATED(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    update: async (req, res) => {
        try {
            const data = await episodeService.update(req.params.id, req.body);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "Episode not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    delete: async (req, res) => {
        try {
            const data = await episodeService.delete(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "Episode not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    getStreamsOfEpisodeByEpisodeId: async (req,res) =>{
        try {
            const data = await episodeService.getStreamsOfEpisodeByEpisodeId(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "Data not found");
            }
            return httpResponse.SUCCESS(res,data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res,err);
        }
    },
};