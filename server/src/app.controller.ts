import { ProfileService } from "#/profile/profile.service"
import { createAccessToken, ENV, IRefreshProfile } from "$$"
import { Controller, Get, Req } from "@nestjs/common"
import { Request } from "express"
import jwt from "jsonwebtoken"
import { AppService } from "./app.service"

@Controller("api")
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly profileService: ProfileService
	) {}

	@Get("/hello")
	getHello(): string {
		return this.appService.getHello()
	}

	@Get("/refresh-auth-token")
	async refreshAuthToken(@Req() request: Request) {
		const cookieToken = request.cookies[ENV.JWT_REFRESH_TOKEN_COOKIE]
		const payload = jwt.verify(cookieToken, ENV.JWT_REFRESH_TOKEN_SECRET) as IRefreshProfile

		const profile = await this.profileService.fetchOne(payload.id)
		if (profile === undefined) throw new Error("Malformed Refresh Token Payload")

		return { accessToken: createAccessToken({ id: profile.id, role: profile.role }) }
	}
}
