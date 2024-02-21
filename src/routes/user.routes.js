import { Router } from "express"
import { usersController } from "../controller/usersController.js"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js"
import multer from "multer"
import uploadConfig from "../configs/upload.js"

const upload = multer(uploadConfig.MULTER)

const usersRoutes = Router()

const userController = new usersController()

usersRoutes.post("/", userController.create)
usersRoutes.put("/", ensureAuthenticated, userController.update)
usersRoutes.delete("/:id", userController.delete)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (request, response) => {
	console.log(request.file.filename)
	response.json()
})

export default usersRoutes
