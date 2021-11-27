import { Customer } from "#/customer.entity"
import { ProfileHollow } from "#/profile.entity"
import { ProfileInput } from "#/profile/dto/profile.input"
import { ForRoles, UseAuthGuard, ProfileRole, IContext, INormalizedPaths, Normalize } from "$$"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { CustomerService } from "./customer.service"
import { CustomerInput } from "./dto/customer.input"

@Resolver()
export class CustomerResolver {
	constructor(private readonly customerService: CustomerService) {}

	@Mutation(() => ProfileHollow)
	registerCustomer(
		@Args("customer") customerInput: CustomerInput,
		@Args("profile") profileInput: ProfileInput
	): Promise<ProfileHollow> {
		return this.customerService.register(customerInput, profileInput)
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
