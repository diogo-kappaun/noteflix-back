import { Router } from "express";
import { usersController } from "../controller/usersController.js";

const usersRoutes = Router();

const userController = new usersController();

usersRoutes.post("/", userController.create);
usersRoutes.put("/:id", userController.update);
usersRoutes.delete("/:id", userController.delete)

export default usersRoutes;
