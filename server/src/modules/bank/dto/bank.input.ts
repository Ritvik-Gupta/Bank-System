import { Bank } from "#/bank.entity"
import { Field, InputType } from "@nestjs/graphql"
import { MaxLength, MinLength } from "class-validator"

@InputType()
export class BankInput implements Partial<Bank> {
	@Field()
	@MinLength(3)
	@MaxLength(20)
	name: string

	@Field()
	@MinLength(3)
	address: string
}
