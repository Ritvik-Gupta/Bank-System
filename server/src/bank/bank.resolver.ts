import { Bank, BankHollow } from "$/entities"
import { INormalizedPaths, Normalize } from "$/services"
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql"
import { BankService } from "./bank.service"
import { BankInput } from "./dto/bank.input"

@Resolver()
export class BankResolver {
	constructor(private readonly bankService: BankService) {}

	@Query(() => [Bank])
	fetchAllBanks(@Normalize.Paths() fieldPath: INormalizedPaths): Promise<Bank[]> {
		return this.bankService.fetchAll(fieldPath)
	}

	@Query(() => Bank)
	async fetchOneBank(
		@Normalize.Paths() fieldPath: INormalizedPaths,
		@Args("id", { type: () => ID }) bankId: string
	): Promise<Bank | undefined> {
		return this.bankService.fetchOne(bankId, fieldPath)
	}

	@Mutation(() => BankHollow)
	createBank(@Args("bank") bank: BankInput): Promise<BankHollow> {
		return this.bankService.create(bank)
	}
}
