import { Employee, ProfileHollow } from "$/entities"
import { ProfileInput } from "$/profile/dto/profile.input"
import { INormalizedPaths, Normalize } from "$/services"
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql"
import { EmployeeInput } from "./dto/employee.input"
import { EmployeeService } from "./employee.service"

@Resolver(() => Employee)
export class EmployeeResolver {
	constructor(private readonly employeeService: EmployeeService) {}

	@Mutation(() => ProfileHollow)
	registerEmployee(
		@Args("employee") employeeInput: EmployeeInput,
		@Args("profile") profileInput: ProfileInput
	): Promise<ProfileHollow> {
		return this.employeeService.register(employeeInput, profileInput)
	}

	@Query(() => Employee)
	async fetchOneEmployee(
		@Normalize.Paths() fieldPath: INormalizedPaths,
		@Args("employeeId", { type: () => ID }) employeeId: string
	): Promise<Employee | undefined> {
		return this.employeeService.fetchOne(employeeId, fieldPath)
	}
}
