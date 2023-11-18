import { Router } from "express";

import usersRoutes from "../routes/user.routes.js";
import moviesRoutes from "../routes/movies.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);

export default routes;