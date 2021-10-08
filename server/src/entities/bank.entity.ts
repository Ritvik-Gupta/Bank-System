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
	@Column({ type: "varchar", unique: true })
	name: string

	@Field()
	@Column({ type: "varchar" })
	address: string
}

@ObjectType()
@Entity()
export class Bank extends BankHollow {
	@Field(() => [Employee])
	@OneToMany(() => Employee, ({ worksAt }) => worksAt)
	employees: Employee[]

	@Field(() => [Account])
	@OneToMany(() => Account, ({ withBank }) => withBank)
	accounts: Account[]
}
