import { AppError } from "../utils/AppError.js";
import { knexConnection } from "../database/knex/index.js";
import pkg from "bcryptjs";

const { hash } = pkg
const knex = knexConnection

export class usersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("All fields are required!");
    }

    const hashPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashPassword,
    })

    return response.json({ name, email, password });
  }
}
