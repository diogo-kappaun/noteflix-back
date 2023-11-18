import { Router } from "express";
import { moviesController } from "../controller/moviesController.js";

const moviesRoutes = Router();

const movieController = new moviesController();

moviesRoutes.post("/", movieController.create);

export default moviesRoutes;
