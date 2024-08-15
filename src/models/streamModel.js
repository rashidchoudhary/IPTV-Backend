import mongoose from "mongoose";

const schema = mongoose.Schema({
    episode_id: { type: mongoose.Schema.Types.ObjectId, ref: "Episode", required: true},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    time: { type: String, required: true},
},
{ timestamps: true }
);

export const streamModel = mongoose.model("Stream", schema);

