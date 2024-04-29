import rateLimit from "express-rate-limit"

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true, 
	legacyHeaders: false,
	message: "Limite de requisições excedidas!"
})

export const profileLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 5,
	standardHeaders: true, 
	legacyHeaders: false,
	message: "Limite de requisições excedidas!"
})