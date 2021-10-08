import { UseGuards, ValidationError } from "@nestjs/common"
import { UserInputError } from "apollo-server-express"
import { GraphQLError } from "graphql"
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
