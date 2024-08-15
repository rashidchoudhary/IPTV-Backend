import mongoose from "mongoose";
const schema = mongoose.Schema(
	{
		first_name: { type: String, required: true, maxlength: 50 },
		last_name: { type: String, required: true, maxlength: 50 },
		email: { type: String, required: true, maxlength: 50, unique: true },
		password: { type: String, required: true},
	},
	{ timestamps: true }
);
export const userModel = mongoose.model("User", schema);
