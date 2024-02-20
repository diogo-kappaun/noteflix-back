import { knexConnection } from "../database/knex/index.js"
import { AppError } from "../utils/AppError.js"

const knex = knexConnection
export class moviesController {
	async create(request, response) {
		const { title, description, rating, tags } = request.body
		const { user_id } = request.params

		const checkUserExist = await knex("users")
			.select("id")
			.where("id", user_id)
			.first()

		if (!checkUserExist) {
			throw new AppError("The user doesn't exist.")
		}

		if (!title || !description || !rating) {
			throw new AppError("All fields are mandatory.")
		}

		if (description.length > 250) {
			throw new AppError("Character limit of 250, be more concise.")
		}

		const [movie_id] = await knex("movies").insert({
			title,
			description,
			rating,
			user_id,
		})

		const tagsInsert = tags.map((name) => {
			return {
				movie_id,
				user_id,
				name,
			}
		})

		await knex("tags").insert(tagsInsert)

		return response.json("Movie note created.")
	}

	async delete(request, response) {
		const { id } = request.params

		await knex("movies").where({ id }).delete()

		return response.json("Movie successfully deleted.")
	}

	async show(request, response) {
		const { id } = request.params

		const note = await knex("movies").where({ id })
		const tags = await knex("tags").where("movie_id", id).orderBy("name")

		return response.json({
			note,
			tags,
		})
	}

	async index(request, response) {
		const { title, user_id, tags } = request.query

		let movies

		if (tags) {
			const filterTags = tags.split(",").map((tag) => tag.trim())
			movies = await knex("tags")
				.select(["movies.id", "movies.user_id", "title"])
				.where("movies.user_id", user_id)
				.whereLike("movies.title", `%${title}%`)
				.whereIn("name", filterTags)
				.innerJoin("movies", "movies.id", "tags.movie_id")
				.orderBy("name")
		} else {
			movies = await knex("movies")
				.where({ user_id })
				.whereLike("title", `%${title}%`)
				.orderBy("title")
		}

		const userTags = await knex("tags").where({ user_id })
		const moviesWithTags = movies.map((movie) => {
			const movieTags = userTags.filter((tag) => tag.movie_id === movie.id)

			return {
				...movie,
				tags: movieTags,
			}
		})

		return response.json({ moviesWithTags })
	}
}
3
