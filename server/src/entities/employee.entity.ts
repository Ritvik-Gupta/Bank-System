import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm"
import { Bank } from "./bank.entity"
import { Profile } from "./profile.entity"

@ObjectType()
export class EmployeeHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	profileId: string

	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	bankId: string
}

@ObjectType()
@Entity()
export class Employee extends EmployeeHollow {
	@Field(() => Profile)
	@OneToOne(() => Profile, ({ asEmployee }) => asEmployee)
	@JoinColumn({ name: "profileId", referencedColumnName: "id" })
	asProfile: Profile

	@Field(() => Bank)
	@ManyToOne(() => Bank, ({ employees }) => employees)
	@JoinColumn({ name: "bankId", referencedColumnName: "id" })
	worksAt: Bank
}
