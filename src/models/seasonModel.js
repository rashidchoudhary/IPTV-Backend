import mongoose from "mongoose";

const schema = mongoose.Schema({
    series_id: { type: mongoose.Schema.Types.ObjectId, ref: "Series", required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
},
{ timestamps: true }
);

export const seasonModel = mongoose.model("Season", schema);

