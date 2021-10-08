import { ProfileHollow } from "$/entities"
import { ProfileInput } from "$/profile/dto/profile.input"
import { Args, Mutation, Resolver } from "@nestjs/graphql"
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
}
