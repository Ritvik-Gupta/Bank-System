import { IAuthProfile, IRefreshProfile } from "$$"
import { UseGuards, ValidationError } from "@nestjs/common"
import { Complexity } from "@nestjs/graphql"
import { UserInputError } from "apollo-server-express"
import { GraphQLError } from "graphql"
import jwt from "jsonwebtoken"
import { AuthenticationGuard, AuthorizationGuard } from "./auth"
import { ENV } from "./custom.env"

export const UseAuthGuard = () => UseGuards(AuthenticationGuard, AuthorizationGuard)

type validationErrors = Record<"validation", ValidationError[]>

export const pipeExceptionFactory = (validation: ValidationError[]) =>
	new UserInputError(ENV.VALIDATION_ERROR_KEY, { validation })

export const gqlFormatError = (error: GraphQLError) =>
	error.message !== ENV.VALIDATION_ERROR_KEY
		? error
		: {
				message: ENV.VALIDATION_ERROR_KEY,
				extensions: {
					validation: (error.extensions as validationErrors).validation.map(err => ({
						field: err.property,
						errors: Object.values(err.constraints ?? {}),
					})),
				},
		  }

export const nestedComplexityCalulator: Complexity = ({ childComplexity }) => childComplexity * 1.5

export const createAccessToken = (payload: IAuthProfile) =>
	jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
		expiresIn: ENV.ACCESS_TOKEN_EXPIRY,
	})

export const createRefreshToken = (payload: IRefreshProfile) =>
	jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
		expiresIn: ENV.REFRESH_TOKEN_EXPIRY,
	})
