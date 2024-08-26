import mongoose from "mongoose";

const schema = mongoose.Schema({
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true},
    series_id: { type: mongoose.Schema.Types.ObjectId, ref: "Series", required: true},
},
{ timestamps: true }
);

export const genreSeriesModel = mongoose.model("GenreSeries", schema);

