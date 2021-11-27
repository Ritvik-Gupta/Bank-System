import { AccountType, nestedComplexityCalulator } from "$$"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
	CreateDateColumn,
	DatabaseType,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from "typeorm"
import { Bank } from "./bank.entity"
import { Customer } from "./customer.entity"

@ObjectType()
export class AccountHollow {
	@Field(() => ID, { complexity: 2 })
	@PrimaryColumn({ type: "uuid" })
	customerId: string

	@Field(() => ID, { complexity: 2 })
	@PrimaryColumn({ type: "uuid" })
	bankId: string

	@Field(() => AccountType)
	@PrimaryColumn({ type: "enum", enum: AccountType })
	accountType: AccountType

	@Field()
	@CreateDateColumn()
	createDate: DatabaseType

	@Field(() => String)
	get transactions(): string {
		console.log(this)
		return "abc"
	}
}

@ObjectType()
@Entity()
export class Account extends AccountHollow {
	@Field(() => Customer, {
		complexity: nestedComplexityCalulator,
	})
	@ManyToOne(() => Customer, ({ havingAccounts }) => havingAccounts)
	@JoinColumn({ name: "customerId", referencedColumnName: "profileId" })
	forCustomer: Customer

	@Field(() => Bank, {
		complexity: nestedComplexityCalulator,
	})
	@ManyToOne(() => Bank, ({ accounts }) => accounts)
	@JoinColumn({ name: "bankId", referencedColumnName: "id" })
	withBank: Bank
}
