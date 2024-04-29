import { Router } from "express"
import multer from "multer"
import { profileLimiter } from "../../utils/Limiter.js"
import uploadConfig from "../configs/upload.js"
import { UserAvatarController } from "../controller/userAvatarController.js"
import { usersController } from "../controller/usersController.js"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js"

const upload = multer(uploadConfig.MULTER)

const usersRoutes = Router()

const userController = new usersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post("/", userController.create)
usersRoutes.put("/", ensureAuthenticated, profileLimiter,userController.update)
usersRoutes.delete("/:id", userController.delete)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

export default usersRoutes
