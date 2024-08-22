import express from "express";
import { streamValidationSchema } from "../validations/index.js";
import { streamController } from "../controllers/index.js";
import { authenticate, validate } from "../middleware/index.js";

const router = express.Router();

router.get("/", streamController.getAll);
router.get("/:id", streamController.getById);
router.post("/",validate(streamValidationSchema.create), streamController.add);
router.patch("/:id", validate(streamValidationSchema.update),streamController.update);
router.delete("/:id", streamController.delete);

router.get("/:id/episode",streamController.getEpisodeOfStreamByStreamId);

router.get("/:id/user",streamController.getUserOfStreamByStreamId);

router.get("/:id/episode/season",streamController.getSeasonOfEpisodeOfStreamByStreamId);

router.get("/:id/episode/season/series",streamController.getSeriesOfSeasonOfEpisodeofStreamByStreamId);

router.get("/:id/episode/season/series/genre",streamController.getGenreOfSeriesOfSeasonOfEpisodeOfStreamByStreamId);

export default router;
