import { Router } from "express"
import { moviesController } from "../controller/moviesController.js"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js"

const moviesRoutes = Router()

const movieController = new moviesController()

moviesRoutes.use(ensureAuthenticated)

moviesRoutes.get("/", movieController.index)
moviesRoutes.post("/", movieController.create)
moviesRoutes.delete("/:id", movieController.delete)
moviesRoutes.get("/:id", movieController.show)

export default moviesRoutes
