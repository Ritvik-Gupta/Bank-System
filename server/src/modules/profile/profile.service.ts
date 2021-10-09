import { Profile, ProfileHollow } from "#/profile.entity"
import { INormalizedPaths, ProfileRole } from "$$"
import { Injectable } from "@nestjs/common"
import { ProfileLoginInput } from "./dto/profile-login.input"
import { ProfileInput } from "./dto/profile.input"
import { ProfileRepository } from "./profile.repository"

@Injectable()
export class ProfileService {
	constructor(private readonly profileRepo: ProfileRepository) {}

	fetchAll(fieldPath: INormalizedPaths): Promise<Profile[]> {
		return this.profileRepo.getPopulatedQuery(fieldPath).getMany()
	}

	fetch(profileId: string, fieldPaths: INormalizedPaths): Promise<Profile | undefined> {
		return this.profileRepo
			.getPopulatedQuery(fieldPaths)
			.where(`${fieldPaths.root}.id = :profileId`, { profileId })
			.getOne()
	}

	async login({ email, password }: ProfileLoginInput): Promise<ProfileHollow> {
		const profile = await this.profileRepo.ifDefined({ email })
		const isSamePassword = await profile.comparePassword(password)
		if (!isSamePassword) throw Error("Invalid Password")
		return profile
	}

	async register(profileInput: ProfileInput, role: ProfileRole): Promise<ProfileHollow> {
		await this.profileRepo.ifNotDefined({ email: profileInput.email })
		return this.profileRepo.createAndReturn({ ...profileInput, role })
	}
}
