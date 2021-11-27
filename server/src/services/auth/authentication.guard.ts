import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { verify } from "jsonwebtoken"
import { ENV } from "../custom.env"
import { IAuthProfile, IContext } from "../custom.types"

@Injectable()
export class AuthenticationGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context).getContext<IContext>()
		if (ctx.req.headers.authorization === undefined) return false
		ctx.profile = this.validateToken(ctx.req.headers.authorization)
		return true
	}

	private validateToken(authorization: string): IAuthProfile {
		const [bearerToken, authToken] = authorization.split(" ")
		if (bearerToken !== "Bearer") throw Error("Invalid Authorization Bearer Token")
		if (authToken === undefined) throw Error("Invalid Authorization JWT Token")
		return verify(authToken, ENV.JWT_ACCESS_TOKEN_SECRET) as IAuthProfile
	}
}
