import { streamService } from "../services/index.js";
import { httpResponse } from "../utils/httpResponse.js";

export const streamController = {

    getAll: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sortBy || "createdAt";
            const order = req.query.order || "asc";
            const data = await streamService.getAll(page, limit, sortBy, order);
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
            const data = await streamService.getById(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "File not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    add: async (req, res) => {
        try {
            const data = await streamService.add(req.body);
            return httpResponse.CREATED(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    update: async (req, res) => {
        try {
            const data = await streamService.update(req.params.id, req.body);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "File not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    delete: async (req, res) => {
        try {
            const data = await streamService.delete(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, "File not found");
            }
            return httpResponse.SUCCESS(res, data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err);
        }
    },
    getEpisodeOfStreamByStreamId: async (req,res) =>{
        try {
            const data = await streamService.getEpisodeOfStreamByStreamId(req.params.id);
            if(!data) {
                return httpResponse.NOT_FOUND("Data not found");
            }
            return httpResponse.SUCCESS(res,data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res,err);
        }
    },
    getUserOfStreamByStreamId: async (req,res) =>{
        try {
            const data = await streamService.getUserOfStreamByStreamId(req.params.id);
            if(!data) {
                return httpResponse.NOT_FOUND("Data not found");
            }
            return httpResponse.SUCCESS(res,data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res,err);
        }
    },
    getSeasonOfEpisodeOfStreamByStreamId: async (req,res) =>{
        try {
            const data = await streamService.getSeasonOfEpisodeOfStreamByStreamId(req.params.id);
            if(!data) {
                return httpResponse.NOT_FOUND("Data not found");
            }
            return httpResponse.SUCCESS(res,data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res,err);
        }
    },
    getSeriesOfSeasonOfEpisodeofStreamByStreamId: async (req,res) =>{
        try {
            const data = await streamService.getSeriesOfSeasonOfEpisodeofStreamByStreamId(req.params.id);
            if(!data) {
                return httpResponse.NOT_FOUND("Data not found");
            }
            return httpResponse.SUCCESS(res,data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res,err);
        }
    },
    getGenreOfSeriesOfSeasonOfEpisodeOfStreamByStreamId: async (req,res) =>{
        try {
            const data = await streamService.getGenreOfSeriesOfSeasonOfEpisodeOfStreamByStreamId(req.params.id);
            if(!data) {
                return httpResponse.NOT_FOUND("Data not found");
            }
            return httpResponse.SUCCESS(res,data);
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res,err);
        }
    },
};