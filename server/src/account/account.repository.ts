import { Account, AccountHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Account)
export class AccountRepository extends BaseRepository<Account, AccountHollow> {
	constructor() {
		super({
			ifDefined: "Account has already been Registered",
			ifNotDefined: "No such Account exists",
		})
	}
}
