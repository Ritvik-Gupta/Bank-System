import { BankRepository } from "#/bank/bank.repository"
import { Employee } from "#/employee.entity"
import { ProfileHollow } from "#/profile.entity"
import { ProfileInput } from "#/profile/dto/profile.input"
import { ProfileService } from "#/profile/profile.service"
import { INormalizedPaths, ProfileRole } from "$$"
import { Injectable } from "@nestjs/common"
import { EmployeeInput } from "./dto/employee.input"
import { EmployeeRepository } from "./employee.repository"

@Injectable()
export class EmployeeService {
	constructor(
		private readonly employeeRepo: EmployeeRepository,
		private readonly bankRepo: BankRepository,
		private readonly profileService: ProfileService
	) {}

	async register(employeeInput: EmployeeInput, profileInput: ProfileInput): Promise<ProfileHollow> {
		await this.bankRepo.ifDefined({ id: employeeInput.bankId })
		const profile = await this.profileService.register(profileInput, ProfileRole.EMPLOYEE)
		await this.employeeRepo.createAndReturn({ ...employeeInput, profileId: profile.id })
		return profile
	}

	fetchOne(employeeId: string, fieldPath: INormalizedPaths): Promise<Employee | undefined> {
		return this.employeeRepo
			.getPopulatedQuery(fieldPath)
			.where(`${fieldPath.root}.profileId = :employeeId`, { employeeId })
			.getOne()
	}
}
