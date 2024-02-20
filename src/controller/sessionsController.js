import { knex } from "../database/knex"
import { AppError } from "../utils/AppError"
import { compare } from "bcryptjs"

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
  }
}
