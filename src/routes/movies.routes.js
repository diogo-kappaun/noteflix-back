import { Router } from 'express'
import { moviesController } from '../controller/moviesController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'
import { limiter } from '../utils/Limiter.js'

const moviesRoutes = Router()

const movieController = new moviesController()

moviesRoutes.use(ensureAuthenticated)

moviesRoutes.get('/', movieController.index)
moviesRoutes.post('/', limiter, movieController.create)
moviesRoutes.delete('/:id', limiter, movieController.delete)
moviesRoutes.get('/:id', movieController.show)

export default moviesRoutes
