import { Customer, CustomerHollow } from "#/customer.entity"
import { BaseRepository } from "$$"
import { EntityRepository } from "typeorm"

@EntityRepository(Customer)
export class CustomerRepository extends BaseRepository<Customer, CustomerHollow> {
	constructor() {
		super({
			ifDefined: "Customer has already been Registered",
			ifNotDefined: "No such Customer exists",
		})
	}
}
