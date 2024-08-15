import { userModel } from "../models/index.js";
import { streamModel } from "../models/index.js";

export const userService = {
	getAll: async (page, limit, sortBy, order, filters) => {
		const skip = (page - 1) * limit;
		let sortOrder;
		if(order === "asc"){
			sortOrder = 1;
		} else {
			sortOrder = -1;
		}
		const data = await userModel.find(filters).sort({ [sortBy]: sortOrder}).skip(skip).limit(limit);
		return data;
	},

	getById: async (id) => {
		return userModel.findById(id);
	},
	add: async(body) =>{
		return userModel.create(body);
	},
	update: async (id, body) =>{
		return userModel.findByIdAndUpdate(id,body, {new: true});
	},
	delete: async (id) =>{
		return userModel.findByIdAndDelete(id);
	},
	login: async (body) =>{
		return userModel.findOne({ email: body.email});
	},
	getAllStreamsById: async (id) =>{
		return streamModel.find({ user_id: id });
	},
	getOneStreamByUserId: async (user_id, stream_id) =>{
		return streamModel.find({user_id: user_id, _id: stream_id});
	},
	deleteStreamByUserId: async (user_id, stream_id) =>{
		return streamModel.find({ _id: stream_id, user_id: user_id})
	}
	
};

