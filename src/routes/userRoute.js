import express from "express";
import { UserValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { userController } from "../controllers/index.js";

const router = express.Router();
router.get("/", authenticate, userController.getAll);
router.get("/:id", authenticate,userController.getById);
router.post("/register", validate(UserValidationSchema.register), userController.add);
router.post("/login", validate(UserValidationSchema.login), userController.login);
router.patch("/:id",authenticate,validate(UserValidationSchema.update),userController.update);
router.delete("/:id",authenticate,userController.delete);
router.get("/:id/streams",authenticate,userController.getAllStreamsById);
router.get("/:id/streams/episodes", authenticate,userController.getAllEpisodesOfAllStreamsByUserId);

export default router;
