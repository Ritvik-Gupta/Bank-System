import { nestedComplexityCalulator } from "$$"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./account.entity"
import { Employee } from "./employee.entity"

@ObjectType()
export class BankHollow {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Field()
	@Column({ type: "varchar", unique: true, length: 20 })
	name: string

	@Field()
	@Column({ type: "varchar" })
	address: string
}

@ObjectType()
@Entity()
export class Bank extends BankHollow {
	@Field(() => [Employee], {
		complexity: nestedComplexityCalulator,
	})
	@OneToMany(() => Employee, ({ worksAt }) => worksAt)
	employees: Employee[]

	@Field(() => [Account], {
		complexity: nestedComplexityCalulator,
	})
	@OneToMany(() => Account, ({ withBank }) => withBank)
	accounts: Account[]
}
