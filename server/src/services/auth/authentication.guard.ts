import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import jwt from "jsonwebtoken"
import { ENV } from "../custom.env"
import { IAuthProfile, IContext } from "../custom.types"

@Injectable()
export class AuthenticationGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context).getContext<IContext>()
		if (ctx.request.headers.authorization === undefined) return false
		ctx.profile = this.validateToken(ctx.request.headers.authorization)
		return true
	}

	private validateToken(authorization: string): IAuthProfile {
		const [bearerToken, authToken] = authorization.split(" ")
		if (bearerToken !== "Bearer") throw Error("Invalid Authorization Bearer Token")
		if (authToken === undefined) throw Error("Invalid Authorization JWT Token")
		return jwt.verify(authToken, ENV.JWT_ACCESS_TOKEN_SECRET) as IAuthProfile
	}
}
