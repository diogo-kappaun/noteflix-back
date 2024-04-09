import { knexConnection } from "../database/knex/index.js"
import { AppError } from "../utils/AppError.js"

const knex = knexConnection
export class moviesController {
	async create(request, response) {
		const { title, description, rating, tags } = request.body
		const user_id = request.user.id

		const checkUserExist = await knex("users")
			.select("id")
			.where("id", user_id)
			.first()

		if (!checkUserExist) {
			throw new AppError("O usuário não existe.")
		}

		if (!title || !description || !rating) {
			throw new AppError("Todos os campos são obrigatórios.")
		}

		if (description.length > 400) {
			throw new AppError("Limite de caracteres de 400, seja mais conciso.")
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

		return response.json("Nota do filme criada.")
	}

	async delete(request, response) {
		const { id } = request.params
		const userAuthId = request.user.id

		const note = await knex("movies").where({ id }).first()

		if (userAuthId !== note.user_id) {
			throw new AppError("Você não tem permissão para excluir o registro de outro usuário.")
		}

		await knex("movies").where({ id }).delete()

		return response.json("Filme excluído com sucesso.")
	}

	async show(request, response) {
		const { id } = request.params
		const userAuthId = request.user.id

		const note = await knex("movies").where({ id }).first()
		const tags = await knex("tags").where("movie_id", id).orderBy("name")

		if (userAuthId !== note.user_id) {
			throw new AppError("Você não tem permissão para ver o registro de outro usuário.")
		}

		return response.json({
			note,
			tags,
		})
	}

	async index(request, response) {
		const { title, tags } = request.query

		const user_id = request.user.id

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

		return response.json(moviesWithTags)
	}
}
3
