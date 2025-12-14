import express from "express";
import * as informationController from "../controllers/informationController.ts";

const router = express.Router();

router.get("/", informationController.getInformations);

router.get("/:infId", informationController.getInformations);

router.post("/", informationController.createInformation);

router.patch("/:infId", informationController.updateInformation);

router.delete("/:infId", informationController.deleteInformation)

export default router;