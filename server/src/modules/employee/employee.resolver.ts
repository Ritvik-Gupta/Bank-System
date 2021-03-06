import { Employee } from "#/employee.entity"
import { ProfileHollow } from "#/profile.entity"
import { ProfileInput } from "#/profile/dto/profile.input"
import { ForRoles, IContext, INormalizedPaths, Normalize, ProfileRole, UseAuthGuard } from "$$"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
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

	@Query(() => Employee, { nullable: true })
	@UseAuthGuard()
	@ForRoles(ProfileRole.EMPLOYEE)
	currentEmployee(
		@Context() context: IContext,
		@Normalize.Paths() fieldPaths: INormalizedPaths
	): Promise<Employee | undefined> {
		return this.employeeService.fetch(context.profile!.id, fieldPaths)
	}
}
