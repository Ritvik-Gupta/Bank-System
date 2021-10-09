import { Account } from "#/account.entity"
import { AccountType } from "$$"
import { Field, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"

@InputType()
export class AccountInput implements Partial<Account> {
	@Field()
	@IsUUID()
	bankId: string

	@Field(() => AccountType)
	accountType: AccountType
}
