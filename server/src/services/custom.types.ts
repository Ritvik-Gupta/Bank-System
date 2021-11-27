import { Request, Response } from "express"
import { ProfileRole } from "./custom.enum"

export interface IRefreshProfile {
	readonly id: string
}

export interface IAuthProfile extends IRefreshProfile {
	readonly role: ProfileRole
}

export interface IContext {
	request: Request
	response: Response
	profile?: IAuthProfile
}
