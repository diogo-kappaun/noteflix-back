import { Router } from "express"
import { tagsController } from "../controller/tagsController.js"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js"

const tagsRoutes = Router()

const tagController = new tagsController

tagsRoutes.get("/", ensureAuthenticated, tagController.index)

export default tagsRoutes