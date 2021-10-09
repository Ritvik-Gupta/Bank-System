import { Bank, BankHollow } from "#/bank.entity"
import { INormalizedPaths } from "$$"
import { Injectable } from "@nestjs/common"
import { BankRepository } from "./bank.repository"
import { BankInput } from "./dto/bank.input"

@Injectable()
export class BankService {
	constructor(private readonly bankRepo: BankRepository) {}

	fetchAll(fieldPath: INormalizedPaths): Promise<Bank[]> {
		return this.bankRepo.getPopulatedQuery(fieldPath).getMany()
	}

	fetchOne(bankId: string, fieldPath: INormalizedPaths): Promise<Bank | undefined> {
		return this.bankRepo
			.getPopulatedQuery(fieldPath)
			.where(`${fieldPath.root}.id = :bankId`, { bankId })
			.getOne()
	}

	async create(bankInput: BankInput): Promise<BankHollow> {
		await this.bankRepo.ifNotDefined({ name: bankInput.name })
		return this.bankRepo.createAndReturn(bankInput)
	}

	async fetchOneUnprotected(bankId: string): Promise<BankHollow | undefined> {
		const result = await this.bankRepo.query(`SELECT * FROM bank WHERE id = '${bankId}' LIMIT 1`)
		return result?.[0]
	}

	async fetchOneUnprotectedWithName(bankName: string): Promise<BankHollow | undefined> {
		const result = await this.bankRepo.query(
			`SELECT * FROM bank WHERE name = '${bankName}' LIMIT 1`
		)
		return result?.[0]
	}

	async fetchOneProtected(bankId: string): Promise<BankHollow | undefined> {
		const result = await this.bankRepo.query(`SELECT * FROM bank WHERE id = $1 LIMIT 1`, [bankId])
		return result?.[0]
	}

	async fetchOneProtectedWithName(bankName: string): Promise<BankHollow | undefined> {
		const result = await this.bankRepo.query(`SELECT * FROM bank WHERE name = $1 LIMIT 1`, [
			bankName,
		])
		return result?.[0]
	}

	async fetchEmployeeIds(bankId: string): Promise<string[]> {
		const rawResult = await this.bankRepo
			.createQueryBuilder("bank")
			.select("emp.profileId", "employeeId")
			.leftJoin("bank.employees", "emp")
			.where("bank.id = :bankId", { bankId })
			.getRawMany()

		return rawResult.map(({ employeeId }) => employeeId)
	}
}
