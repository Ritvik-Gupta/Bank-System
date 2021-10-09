import { Employee, EmployeeHollow } from "#/employee.entity"
import { BaseRepository } from "$$"
import { EntityRepository } from "typeorm"

@EntityRepository(Employee)
export class EmployeeRepository extends BaseRepository<Employee, EmployeeHollow> {
	constructor() {
		super({
			ifDefined: "Employee has already been Registered",
			ifNotDefined: "No such Employee exists",
		})
	}
}
