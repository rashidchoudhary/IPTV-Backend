import express from "express";
import { episodeValidationSchema } from "../validations/index.js";
import { episodeController } from "../controllers/index.js";
import { authenticate, validate } from "../middleware/index.js";

const router = express.Router();

router.get("/", episodeController.getAll);
router.get("/:id", episodeController.getById);
router.post("/",validate(episodeValidationSchema.create), episodeController.add);
router.patch("/:id", authenticate, validate(episodeValidationSchema.update),episodeController.update);
router.delete("/:id", authenticate, episodeController.delete);
router.get("/:id/streams", episodeController.getStreamsOfEpisodeByEpisodeId);

export default router;
