import { Employee } from "#/employee.entity"
import { Field, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"

@InputType()
export class EmployeeInput implements Partial<Employee> {
	@Field()
	@IsUUID()
	bankId: string
}
