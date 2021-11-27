import { Customer } from "#/customer.entity"
import { ProfileInput } from "#/profile/dto/profile.input"
import {
	createAccessToken,
	createRefreshToken,
	ENV,
	ForRoles,
	IContext,
	INormalizedPaths,
	Normalize,
	ProfileRole,
	UseAuthGuard,
} from "$$"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { CustomerService } from "./customer.service"
import { CustomerInput } from "./dto/customer.input"

@Resolver()
export class CustomerResolver {
	constructor(private readonly customerService: CustomerService) {}

	@Mutation(() => String)
	async registerCustomer(
		@Context() { response }: IContext,
		@Args("customer") customerInput: CustomerInput,
		@Args("profile") profileInput: ProfileInput
	): Promise<string> {
		const profile = await this.customerService.register(customerInput, profileInput)

		response.cookie(ENV.JWT_REFRESH_TOKEN_COOKIE, createRefreshToken({ id: profile.id }), {
			httpOnly: true,
		})
		return createAccessToken({ id: profile.id, role: profile.role })
	}

	@Query(() => Customer, { nullable: true })
	@UseAuthGuard()
	@ForRoles(ProfileRole.CUSTOMER)
	currentCustomer(
		@Context() context: IContext,
		@Normalize.Paths() fieldPaths: INormalizedPaths
	): Promise<Customer | undefined> {
		return this.customerService.fetch(context.profile!.id, fieldPaths)
	}
}
