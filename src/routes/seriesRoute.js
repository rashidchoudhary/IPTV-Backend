import express from "express";
import { seriesValidationSchema } from "../validations/index.js";
import { validate,authenticate } from "../middleware/index.js";
import { seriesController } from "../controllers/index.js";

const router = express.Router();

router.get("/", seriesController.getAll);
router.get("/:id", seriesController.getById);
router.post("/", validate(seriesValidationSchema.create), seriesController.add);
router.patch("/:id",validate(seriesValidationSchema.update), seriesController.update);
router.delete("/:id", seriesController.delete);
router.get("/:id/seasons", seriesController.getAllSeasonsOfSeriesBySeriesId);
router.get("/:id/seasons/episodes", seriesController.getAllEpisodesOfSeriesBySeriesId);

export default router;