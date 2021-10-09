import { Profile, ProfileHollow } from "#/profile.entity"
import { IContext, INormalizedPaths, Normalize, UseAuthGuard } from "$$"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { ProfileLoginInput } from "./dto/profile-login.input"
import { ProfileService } from "./profile.service"

@Resolver(() => Profile)
export class ProfileResolver {
	constructor(private readonly profileService: ProfileService) {}

	@Query(() => [Profile])
	fetchAllProfiles(@Normalize.Paths() fieldPath: INormalizedPaths): Promise<Profile[]> {
		return this.profileService.fetchAll(fieldPath)
	}

	@Query(() => Profile, { nullable: true })
	@UseAuthGuard()
	currentProfile(
		@Context() context: IContext,
		@Normalize.Paths() fieldPaths: INormalizedPaths
	): Promise<Profile | undefined> {
		return this.profileService.fetch(context.profile!.id, fieldPaths)
	}

	@Mutation(() => ProfileHollow)
	login(@Args("login") login: ProfileLoginInput): Promise<ProfileHollow> {
		return this.profileService.login(login)
	}
}
