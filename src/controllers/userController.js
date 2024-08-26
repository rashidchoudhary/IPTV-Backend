import { userService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";
import bcrypt from 'bcrypt';
import config from "../config/index.js";
import jwt from "jsonwebtoken";

export const userController = {
	getAll: async (req, res) => {
		try {
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const sortBy = req.query.sortBy || "createdAt";
			const order = req.query.order || "asc";
			const filters = {};

			if (req.query.first_name) {
				filters.first_name = { $regex: new RegExp(req.query.first_name, "i") };
			}
			if (req.query.last_name) {
				filters.last_name = { $regex: new RegExp(req.query.last_name, "i") };
			}
			if (req.query.email) {
				filters.email = { $regex: new RegExp(req.query.email, "i") };
			}
			const data = await userService.getAll(page, limit, sortBy, order, filters);
			if(!data) {
				return httpResponse.NOT_FOUND(res, "Data not found");
			}
			return httpResponse.SUCCESS(res, data);
		} catch (error) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
	},
	getById: async (req, res) => {
		try {
			const data = await userService.getById(req.params.id);
			if(!data) {
				return httpResponse.NOT_FOUND(res, "User not found");
			}
			return httpResponse.SUCCESS(res, data);
		} catch (err) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, err);
		}
	},
	add: async (req, res) => {
		try {
			const salt = await bcrypt.genSalt();
			const hashedpassword = await bcrypt.hash(req.body.password, 10);
			req.body.password = hashedpassword;
			const data = await userService.add(req.body);
			return httpResponse.CREATED(res, data);
		} catch (error) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
	},
	update: async (req, res) => {
		try {
			const salt = await bcrypt.genSalt();
			const hashedpassword = await bcrypt.hash(req.body.password, 10);
			req.body.password = hashedpassword;
			const data = await userService.update(req.params.id, req.body);
			if(!data) {
				return httpResponse.NOT_FOUND(res, "User not found");
			}
			return httpResponse.SUCCESS(res, data);
		} catch (err) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, err);
		}
	},
	delete: async (req,res) => {
		try {
			const data = await userService.delete(req.params.id);
			if(!data) {
				return httpResponse.NOT_FOUND(res, "User not found");
			}
			return httpResponse.SUCCESS(res, data);
		} catch (err) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, err);
		}
	},
	login: async (req, res) => {
        try {
            const data = await userService.login(req.body);

            if (!data) {
                return httpResponse.NOT_FOUND(res, "User not found");
            }

            const isPasswordCorrect = await bcrypt.compare(req.body.password, data.password);

            if (isPasswordCorrect) {
                const token = jwt.sign({ data: data._id }, config.env.jwtSecret);
                return httpResponse.SUCCESS(res, {
                    message: "Token generated successfully",
                    token: token,
                });
            } else {
                return httpResponse.UNAUTHORIZED(res, "Incorrect Password");
            }
        } catch (err) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, err); 
        }
    },
	getAllStreamsById: async (req,res) =>{
		try {
			const data = await userService.getAllStreamsById(req.params.id);
			if(!data) {
				return httpResponse.NOT_FOUND(res, "Data not found");
			}
			return httpResponse.SUCCESS(res, data)
		} catch (err) {
			return httpResponse.INTERNAL_SERVER_ERROR(res,err);
		}
	},
	getAllEpisodesOfAllStreamsByUserId: async (req,res) =>{
		try {
			const data = await userService.getAllEpisodesOfAllStreamsByUserId(req.params.id);
			if(!data) {
				return httpResponse.NOT_FOUND(res, "Data not found");
			}
			return httpResponse.SUCCESS(res, data);
		} catch (err) {
			return httpResponse.INTERNAL_SERVER_ERROR(res,err);
		}
	},
};
