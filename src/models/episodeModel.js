import mongoose from "mongoose";

const schema = mongoose.Schema({
    season_id: { type: mongoose.Schema.Types.ObjectId, ref: "Season", required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    thumbnail_id: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true},
},
{ timestamps: true }
);

export const episodeModel = mongoose.model("Episode", schema);

