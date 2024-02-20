import { Router } from "express"
import { usersController } from "../controller/usersController.js"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js"

const usersRoutes = Router()

const userController = new usersController()

usersRoutes.post("/", userController.create)
usersRoutes.put("/", ensureAuthenticated, userController.update)
usersRoutes.delete("/:id", userController.delete)

export default usersRoutes
