import { Bank, BankHollow } from "#/bank.entity"
import { BaseRepository } from "$$"
import { EntityRepository } from "typeorm"

@EntityRepository(Bank)
export class BankRepository extends BaseRepository<Bank, BankHollow> {
	constructor() {
		super({
			ifDefined: "Bank has already been Registered",
			ifNotDefined: "No such Bank exists",
		})
	}
}
