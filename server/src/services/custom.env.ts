import dotenv from "dotenv"

dotenv.config()

export namespace ENV {
	export const PORT = process.env.PORT!
	export const HASH_SALT_ROUNDS = parseInt(process.env.HASH_SALT_ROUNDS!)

	export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET!
	export const JWT_ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_TOKEN_EXPIRY!

	export const JWT_REFRESH_TOKEN_COOKIE = process.env.JWT_REFRESH_TOKEN_COOKIE!
	export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET!
	export const JWT_REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_TOKEN_EXPIRY!

	export const DATABASE_URL = process.env.DATABASE_URL!
	export const MAX_QUERY_COMPLEXITY = parseInt(process.env.MAX_QUERY_COMPLEXITY!)

	export const VALIDATION_ERROR_KEY = "VALIDATION_ERROR"
	export const AUTH_ROLES_KEY = "roles"

	export const NODE_ENV = process.env.NODE_ENV
	export const IN_PRODUCTION = NODE_ENV === "production"
}
