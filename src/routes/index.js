import { Router } from "express"

import moviesRoutes from "../routes/movies.routes.js"
import tagsRoutes from "../routes/tags.routes.js"
import usersRoutes from "../routes/user.routes.js"
import { limiter } from "../utils/limiter.js"
import sessionsRoutes from "./sessions.routes.js"

const routes = Router()

routes.use("/users", limiter, usersRoutes)
routes.use("/movies", moviesRoutes)
routes.use("/tags", limiter, tagsRoutes)
routes.use("/sessions", limiter, sessionsRoutes)

export default routes