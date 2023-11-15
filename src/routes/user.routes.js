import { Router } from "express";
import { usersController } from "../controller/usersController.js";

const usersRoutes = Router();

const userController = new usersController();

usersRoutes.post("/", userController.create);

export default usersRoutes;
