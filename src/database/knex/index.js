import knexfile from "../../../knexfile.js"
import knex from "knex"

export const knexConnection = knex(knexfile.development)