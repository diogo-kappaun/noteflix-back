import { AppError } from "../utils/AppError.js";
import { knexConnection } from "../database/knex/index.js";

const knex = knexConnection
export class usersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("All fields are required!");
    }

    await knex("users").insert({
      name,
      email,
      password
    })

    return response.json({ name, email, password });
  }
}
