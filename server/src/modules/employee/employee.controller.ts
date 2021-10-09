import { EmployeeHollow } from "#/employee.entity"
import { Controller, Get, Param } from "@nestjs/common"
import { EmployeeService } from "./employee.service"

@Controller("employee")
export class EmployeeController {
	constructor(private readonly employeeService: EmployeeService) {}

	@Get("/:employeeId")
	fetchOneUnder(@Param("employeeId") employeeId: string): Promise<EmployeeHollow | undefined> {
		return this.employeeService.fetchOne(employeeId, {
			root: "employee",
			relations: [],
		})
	}
}
