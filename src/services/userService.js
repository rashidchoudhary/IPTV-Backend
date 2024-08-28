import { userModel } from "../models/index.js";
import mongoose from "mongoose";

export const userService = {
	getAll: async (page, limit, sortBy, order, filters) => {
		const skip = (page - 1) * limit;
		let sortOrder;
		if (order === "asc") {
			sortOrder = 1;
		} else {
			sortOrder = -1;
		}
		const data = await userModel.find(filters).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit);
		return data;
	},

	getById: async (id) => {
		return userModel.findById(id);
	},
	add: async (body) => {
        const existingUser = await userModel.findOne({ email: body.email });
        if (existingUser) {
            throw new mongoose.Error('User already exists');
        }
        return userModel.create(body);
    },
	update: async (id, body) => {
		return userModel.findByIdAndUpdate(id, body, { new: true });
	},
	delete: async (id) => {
		return userModel.findByIdAndDelete(id);
	},
	login: async (body) => {
		return userModel.findOne({ email: body.email });
	},
	getAllStreamsById: async (id) => {
		return userModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id)
				},
			},
			{
				$lookup: {
					from: "streams",
					localField: "_id",
					foreignField: "user_id",
					as: "streams",
				},
			},
		])
	},
	getAllEpisodesOfAllStreamsByUserId: async (id) => {
		return userModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id)
				},
			},
			{
				$lookup: {
					from: "streams",
					localField: "_id",
					foreignField: "user_id",
					pipeline: [
					  {
						$lookup: {
						  from: "episodes",
						  localField: "episode_id",
						  foreignField: "_id",
						  as: "episodes",
						},
					  },
					],
					as: "streams",
				  },
			}
		]);
	},

};

