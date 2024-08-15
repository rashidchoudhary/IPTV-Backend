import express from "express";
import { genreSeriesValidationSchema } from "../validations/index.js";
import { genreSeriesController } from "../controllers/index.js";
import { authenticate, validate } from "../middleware/index.js";

const router = express.Router();

router.get("/", genreSeriesController.getAll);
router.get("/:id", genreSeriesController.getById);
router.post("/",validate(genreSeriesValidationSchema.create), genreSeriesController.add);
router.patch("/:id", authenticate, validate(genreSeriesValidationSchema.update),genreSeriesController.update);
router.delete("/:id", authenticate, genreSeriesController.delete);

export default router;
