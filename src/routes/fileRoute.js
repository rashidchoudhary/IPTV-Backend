import express from "express";
import { fileValidationSchema } from "../validations/index.js";
import { fileController } from "../controllers/index.js";
import { authenticate, validate } from "../middleware/index.js";

const router = express.Router();

router.get("/", fileController.getAll);
router.get("/:id", fileController.getById);
router.post("/",validate(fileValidationSchema.create), fileController.add);
router.patch("/:id", authenticate, validate(fileValidationSchema.update),fileController.update);
router.delete("/:id", authenticate, fileController.delete);

export default router;
