import { Profile, ProfileHollow } from "#/profile.entity"
import { BaseRepository } from "$$"
import { EntityRepository } from "typeorm"

@EntityRepository(Profile)
export class ProfileRepository extends BaseRepository<Profile, ProfileHollow> {
	constructor() {
		super({
			ifDefined: "A Profile has already been registered with the email",
			ifNotDefined: "No such Profile exists",
		})
	}
}
