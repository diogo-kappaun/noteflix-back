import { Router } from "express";
import { moviesController } from "../controller/moviesController.js";

const moviesRoutes = Router();

const movieController = new moviesController();

moviesRoutes.post("/:user_id", movieController.create);
moviesRoutes.delete("/:id", movieController.delete)
moviesRoutes.get("/:id", movieController.show)

export default moviesRoutes;
