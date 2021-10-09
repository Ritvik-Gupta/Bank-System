import { BankHollow } from "#/bank.entity"
import { Controller, Get, Param } from "@nestjs/common"
import { BankService } from "./bank.service"

@Controller("bank")
export class BankController {
	constructor(private readonly bankService: BankService) {}

	@Get("/unprotected/id/:bankId")
	fetchOneUnprotectedWithId(@Param("bankId") bankId: string): Promise<BankHollow | undefined> {
		return this.bankService.fetchOneUnprotectedWithId(bankId)
	}

	@Get("/unprotected/name/:bankName")
	fetchOneUnprotectedWithName(
		@Param("bankName") bankName: string
	): Promise<BankHollow | undefined> {
		return this.bankService.fetchOneUnprotectedWithName(bankName)
	}

	@Get("/protected/id/:bankId")
	fetchOneProtectedWithId(@Param("bankId") bankId: string): Promise<BankHollow | undefined> {
		return this.bankService.fetchOneProtectedWithId(bankId)
	}

	@Get("/protected/name/:bankName")
	fetchOneProtectedWithName(@Param("bankName") bankName: string): Promise<BankHollow | undefined> {
		return this.bankService.fetchOneProtectedWithName(bankName)
	}

	@Get("/:bankId/over")
	fetchOneOver(@Param("bankId") bankId: string): Promise<BankHollow | undefined> {
		return this.bankService.fetchOne(bankId, {
			root: "bank",
			relations: [["bank", "employees"]],
		})
	}

	@Get(["/:bankId", "/:bankId/under"])
	fetchOneUnder(@Param("bankId") bankId: string): Promise<BankHollow | undefined> {
		return this.bankService.fetchOne(bankId, {
			root: "bank",
			relations: [],
		})
	}

	@Get("/:bankId/employee-ids")
	fetchEmployeeIds(@Param("bankId") bankId: string): Promise<string[]> {
		return this.bankService.fetchEmployeeIds(bankId)
	}
}
