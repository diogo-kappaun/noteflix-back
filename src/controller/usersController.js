import pkg from "bcryptjs"
import { knexConnection } from "../database/knex/index.js"
import { AppError } from "../utils/AppError.js"

const { hash, compare } = pkg
const knex = knexConnection

export class usersController {
	async create(request, response) {
		const { name, email, password } = request.body

		if (!name || !email || !password) {
			throw new AppError("Todos os campos são obrigatórios")
		}

		const registeredEmails = await knex("users")
			.select("email")
			.where({ email })
			.first()

		if (registeredEmails) {
			throw new AppError("O e-mail já está registrado!")
		}

		const hashPassword = await hash(password, 8)

		await knex("users").insert({
			name,
			email,
			password: hashPassword,
		})

		return response.json({ message: "Usuário registrado com sucesso." })
	}

	async update(request, response) {
		const { name, email, password, old_password } = request.body
		const user_id = request.user.id

		const user = await knex("users").where({ id: user_id }).first()

		if (!user) {
			throw new AppError("Usuário não encontrado!")
		}

		if (user.email == email) {
			throw new AppError("O e-mail já está em uso.")
		}

		if (user.name == name) {
			throw new AppError("O nome já está em uso.")
		}

		user.name = name ?? user.name
		user.email = email ?? user.email

		if (password && !old_password) {
			throw new AppError("Senha antiga não fornecida.")
		}

		if (password && old_password) {
			const checkOldPassword = await compare(old_password, user.password)

			if (!checkOldPassword) {
				throw new AppError("A senha não corresponde.")
			}

			user.password = await hash(password, 8)
		}

		await knex("users").update({
			name: user.name,
			email: user.email,
			password: user.password,
			updated_at: knex.fn.now(),
		}).where({ id: user_id })

		return response.json("Usuário atualizado com sucesso.")
	}

	async delete(request, response) {
		const { id } = request.params

		await knex("users").delete("*").where({ id })

		return response.json({ message: "Usuário excluído com sucesso." })
	}
}
