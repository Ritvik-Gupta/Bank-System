import { Account } from "$/entities"
import { AccountType } from "$/services"
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
