import { knexConnection } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";

const knex = knexConnection;
export class moviesController {
  async create(request, response) {
    const { name, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const checkUserExist = await knex("users")
      .select("id")
      .where("id", user_id)
      .first();

    if (!checkUserExist) {
      throw new AppError("The user doesn't exist.");
    }

    if (!name || !description || !rating) {
      throw new AppError("All fields are mandatory.");
    }

    if (description.length > 250) {
      throw new AppError("Character limit of 250, be more concise.");
    }

    const [movie_id] = await knex("movies").insert({
      name,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        movie_id,
        user_id,
        name,
      };
    });

    await knex("tags").insert(tagsInsert);

    return response.json("Movie note created.");
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movies").delete("*").where({ id })
  
    return response.json("Movie successfully deleted.");
  }

  async show(request, response) {
    const { id } = request.params

    const note = await knex("movies").where({ id })
    const tags = await knex("tags").where("movie_id", id).orderBy("name")

    return response.json({
      note,
      tags
    })
  }
}
