import { Router } from "express"
import { rateLimit } from "express-rate-limit"
import { SessionsControllers } from "../controller/sessionsController.js"

const loginRateLimiter = rateLimit({
	windowMs: 1*60*1000,
	max: 3,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Tentativas de login excedidas."
})

const sessionsControllers = new SessionsControllers()

const sessionsRoutes = Router()

sessionsRoutes.post("/", loginRateLimiter, sessionsControllers.create)

export default sessionsRoutes