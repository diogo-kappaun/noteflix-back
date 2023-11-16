import { AppError } from "../utils/AppError.js";
import { knexConnection } from "../database/knex/index.js";
import pkg from "bcryptjs";

const { hash } = pkg;
const knex = knexConnection;

export class usersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("All fields are required!");
    }

    const hashPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashPassword,
    });

    return response.json({ name, email, password });
  }

  async update(request, response) {
    const { name, email, password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id });

    if (!user) {
      throw new AppError("User not found!");
    }

    return response.json(JSON.stringify(user));
  }
}
