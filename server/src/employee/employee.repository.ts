import { Employee, EmployeeHollow } from "$/entities"
import { BaseRepository } from "$/services"
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
