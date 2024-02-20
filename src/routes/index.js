import { Router } from "express";

import usersRoutes from "../routes/user.routes.js";
import moviesRoutes from "../routes/movies.routes.js";
import tagsRoutes from "../routes/tags.routes.js";
import sessionsRoutes from "./sessions.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);
routes.use("/tags", tagsRoutes)
routes.use("/sessions", sessionsRoutes)

export default routes;