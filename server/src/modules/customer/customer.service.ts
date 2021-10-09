import { ProfileHollow } from "#/profile.entity"
import { ProfileInput } from "#/profile/dto/profile.input"
import { ProfileService } from "#/profile/profile.service"
import { ProfileRole } from "$$"
import { Injectable } from "@nestjs/common"
import { CustomerRepository } from "./customer.repository"
import { CustomerInput } from "./dto/customer.input"

@Injectable()
export class CustomerService {
	constructor(
		private readonly customerRepo: CustomerRepository,
		private readonly profileService: ProfileService
	) {}

	async register(customerInput: CustomerInput, profileInput: ProfileInput): Promise<ProfileHollow> {
		const profile = await this.profileService.register(profileInput, ProfileRole.CUSTOMER)
		await this.customerRepo.createAndReturn({ ...customerInput, profileId: profile.id })
		return profile
	}
}
