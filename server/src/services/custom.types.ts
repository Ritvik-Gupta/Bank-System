import { Request } from "express"
import { ProfileRole } from "./custom.enum"

export interface IAuthProfile {
	readonly id: string
	readonly email: string
	readonly role: ProfileRole
}

export interface IContext {
	req: Request
	profile?: IAuthProfile
}
