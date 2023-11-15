import { Router } from "express";

import usersRoutes from "../routes/user.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);

export default routes;
