import { Account, AccountHollow } from "#/account.entity"
import { ForRoles, IContext, ProfileRole, UseAuthGuard } from "$$"
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"
import { AccountService } from "./account.service"
import { AccountInput } from "./dto/account.input"

@Resolver(() => Account)
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Mutation(() => AccountHollow)
	@UseAuthGuard()
	@ForRoles(ProfileRole.CUSTOMER)
	createAccount(
		@Context() ctx: IContext,
		@Args("account") account: AccountInput
	): Promise<AccountHollow> {
		return this.accountService.create(account, ctx.profile!.id)
	}
}
