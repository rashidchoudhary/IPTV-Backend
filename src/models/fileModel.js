import mongoose from "mongoose";

const schema = mongoose.Schema({
    original_name: { type: String, required: true},
    current_name: { type: String, required: true},
    type: { type: String, required: true},
    path: { type: String, required: true},
    size: { type: String, required: true},
},
{ timestamps: true }
);

export const fileModel = mongoose.model("File", schema);

