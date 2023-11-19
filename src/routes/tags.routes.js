import { Router } from "express";
import { tagsController } from "../controller/tagsController.js";

const tagsRoutes = Router()

const tagController = new tagsController

tagsRoutes.get("/:user_id", tagController.index)

export default tagsRoutes;