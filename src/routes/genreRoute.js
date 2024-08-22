import express from "express";
import { genreValidationSchema } from "../validations/index.js";
import { authenticate, validate } from "../middleware/index.js";
import { genreController } from "../controllers/index.js";

const router = express.Router();

router.get("/",genreController.getAll);
router.get("/:id",genreController.getById);
router.post("/", validate(genreValidationSchema.create), genreController.add);
router.delete("/:id", genreController.delete);
router.patch("/:id", validate(genreValidationSchema.update), genreController.update);
router.get("/:id/series", genreController.getAllSeriesByGenreId);
router.get("/:id/series/seasons",genreController.getAllSeasonOfAllSeriesByGenreId);
 export default router;