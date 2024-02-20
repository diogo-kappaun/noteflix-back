import { Router } from 'express'
import { SessionsControllers } from '../controller/sessionsController.js'

const sessionsControllers = new SessionsControllers()

const sessionsRoutes = Router()

sessionsRoutes.post("/", sessionsControllers.create)

export default sessionsRoutes