import { knexConnection } from "../database/knex/index.js";

const knex = knexConnection

export class tagsController {
  async index(request, response) {
    const { user_id } = request.params

    const tags = await knex("tags").where({user_id})

    return response.json({ tags })
  }
}