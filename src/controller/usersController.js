import { AppError } from "../utils/AppError.js"
import { knexConnection } from "../database/knex/index.js"
import pkg from "bcryptjs"

const { hash, compare } = pkg
const knex = knexConnection

export class usersController {
	async create(request, response) {
		const { name, email, password } = request.body

		if (!name || !email || !password) {
			throw new AppError("All fields are mandatory.")
		}

		const registeredEmails = await knex("users")
			.select("email")
			.where({ email })
			.first()

		if (registeredEmails) {
			throw new AppError("Email is already registered!")
		}

		const hashPassword = await hash(password, 8)

		await knex("users").insert({
			name,
			email,
			password: hashPassword,
		})

		return response.json({ message: "Registered user successfully." })
	}

	async update(request, response) {
		const { name, email, password, old_password } = request.body
		const user_id = request.user.id

		const user = await knex("users").where({ id: user_id }).first()

		if (!user) {
			throw new AppError("User not found!")
		}

		if (user.email == email) {
			throw new AppError("Email is already in use")
		}

		if (user.name == name) {
			throw new AppError("Name is already in use")
		}

		user.name = name ?? user.name
		user.email = email ?? user.email

		if (password && !old_password) {
			throw new AppError("Old password not provided")
		}

		if (password && old_password) {
			const checkOldPassword = await compare(old_password, user.password)

			if (!checkOldPassword) {
				throw new AppError("Password does not match")
			}

			user.password = await hash(password, 8)
		}

		await knex("users").update({
			name: user.name,
			email: user.email,
			password: user.password,
			updated_at: knex.fn.now(),
		}).where({ id: user_id })

		return response.json("User updated successfully")
	}

	async delete(request, response) {
		const { id } = request.params

		await knex("users").delete("*").where({ id })

		return response.json({ message: "User deleted successfully." })
	}
}
