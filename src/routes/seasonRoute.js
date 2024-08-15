import express from "express";
import { seasonValidationSchema } from "../validations/index.js";
import { seasonController } from "../controllers/index.js";
import { authenticate, validate } from "../middleware/index.js";

const router = express.Router();

router.get("/", seasonController.getAll);
router.get("/:id", seasonController.getById);
router.post("/",validate(seasonValidationSchema.create), seasonController.add);
router.patch("/:id", authenticate, validate(seasonValidationSchema.update),seasonController.update);
router.delete("/:id", authenticate, seasonController.delete);
router.get("/:id/episodes", seasonController.getAllEpisodesOfseasonBySeasonId);
 export default router;
