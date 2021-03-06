import { Customer } from "#/customer.entity"
import { Field, InputType } from "@nestjs/graphql"
import { MinLength } from "class-validator"

@InputType()
export class CustomerInput implements Partial<Customer> {
	@Field()
	@MinLength(3)
	address: string
}
