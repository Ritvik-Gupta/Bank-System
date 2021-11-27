import { Employee } from "#/employee.entity"
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
import { EmployeeInput } from "./dto/employee.input"
import { EmployeeService } from "./employee.service"

@Resolver(() => Employee)
export class EmployeeResolver {
	constructor(private readonly employeeService: EmployeeService) {}

	@Mutation(() => String)
	async registerEmployee(
		@Context() { response }: IContext,
		@Args("employee") employeeInput: EmployeeInput,
		@Args("profile") profileInput: ProfileInput
	): Promise<string> {
		const profile = await this.employeeService.register(employeeInput, profileInput)

		response.cookie(ENV.JWT_REFRESH_TOKEN_COOKIE, createRefreshToken({ id: profile.id }), {
			httpOnly: true,
		})
		return createAccessToken({ id: profile.id, role: profile.role })
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
