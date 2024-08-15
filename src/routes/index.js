import express from "express";

import userRoute from "./userRoute.js";
import genreRoute from "./genreRoute.js";
import seriesRoute from "./seriesRoute.js";
import seasonRoute from "./seasonRoute.js";
import episodeRoute from "./episodeRoute.js";
import genreSeriesRoute from "./genreSeriesRoute.js";
import fileRoute from "./fileRoute.js";
import streamRoute from "./streamRoute.js";

const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
protectedRouter.use("/genre", genreRoute);
protectedRouter.use("/series", seriesRoute);
protectedRouter.use("/season", seasonRoute);
protectedRouter.use("/episode", episodeRoute);
protectedRouter.use("/genreseries", genreSeriesRoute);
protectedRouter.use("/file", fileRoute);
protectedRouter.use("/stream", streamRoute);
// Un-Protected Routes
unProtectedRouter.use("/user", userRoute);

export { protectedRouter, unProtectedRouter };
