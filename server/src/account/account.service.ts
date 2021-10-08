import { AccountHollow } from "$/entities"
import { Injectable } from "@nestjs/common"
import { AccountRepository } from "./account.repository"
import { AccountInput } from "./dto/account.input"

@Injectable()
export class AccountService {
	constructor(private readonly accountRepo: AccountRepository) {}

	async create(accountInput: AccountInput, customerId: string): Promise<AccountHollow> {
		await this.accountRepo.ifNotDefined({ customerId, ...accountInput })
		return this.accountRepo.createAndReturn({ customerId, ...accountInput })
	}
}
