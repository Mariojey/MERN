import express from "express"
import * as UserController from "../controllers/userController.ts";

const router = express.Router();

router.get("/", UserController.getAUthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

export default router;