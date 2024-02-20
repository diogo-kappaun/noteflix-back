import { knexConnection } from "../database/knex/index.js"
import { AppError } from "../utils/AppError.js"
import pkgb from "bcryptjs"
import authConfig from "../configs/auth.js"
import pkg from "jsonwebtoken"

const knex = knexConnection
const { compare } = pkgb
const { sign } = pkg

export class SessionsControllers {
  async create(request, response) {
    const { email, password } = request.body
    
    const user = await knex('users').where({email}).first()

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}
