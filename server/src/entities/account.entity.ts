import { AccountType } from "$$"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Bank } from "./bank.entity"
import { Customer } from "./customer.entity"

@ObjectType()
export class AccountHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	customerId: string

	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	bankId: string

	@Field(() => AccountType)
	@PrimaryColumn({ type: "enum", enum: AccountType })
	accountType: AccountType

	@Field()
	@CreateDateColumn()
	createDate: Date
}

@ObjectType()
@Entity()
export class Account extends AccountHollow {
	@Field(() => Customer)
	@ManyToOne(() => Customer, ({ havingAccounts }) => havingAccounts)
	@JoinColumn({ name: "customerId", referencedColumnName: "profileId" })
	forCustomer: Customer

	@Field(() => Bank)
	@ManyToOne(() => Bank, ({ accounts }) => accounts)
	@JoinColumn({ name: "bankId", referencedColumnName: "id" })
	withBank: Bank
}
