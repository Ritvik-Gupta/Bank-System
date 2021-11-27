import { nestedComplexityCalulator } from "$$"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm"
import { Bank } from "./bank.entity"
import { Profile } from "./profile.entity"

@ObjectType()
export class EmployeeHollow {
	@Field(() => ID, { complexity: 2 })
	@PrimaryColumn({ type: "uuid" })
	profileId: string

	@Field(() => ID, { complexity: 2 })
	@PrimaryColumn({ type: "uuid" })
	bankId: string
}

@ObjectType()
@Entity()
export class Employee extends EmployeeHollow {
	@Field(() => Profile, {
		complexity: nestedComplexityCalulator,
	})
	@OneToOne(() => Profile, ({ asEmployee }) => asEmployee)
	@JoinColumn({ name: "profileId", referencedColumnName: "id" })
	asProfile: Profile

	@Field(() => Bank, {
		complexity: nestedComplexityCalulator,
	})
	@ManyToOne(() => Bank, ({ employees }) => employees)
	@JoinColumn({ name: "bankId", referencedColumnName: "id" })
	worksAt: Bank
}
