import { ENV, IAuthProfile, ProfileRole } from "$$"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import bcrypt from "bcrypt"
import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Customer } from "./customer.entity"
import { Employee } from "./employee.entity"

@ObjectType()
@Entity()
export class Profile implements IAuthProfile {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Field()
	@Column({ type: "varchar", length: 100 })
	firstName: string

	@Field()
	@Column({ type: "varchar", length: 100 })
	lastName: string

	@Field()
	@Column({ type: "varchar", length: 100, unique: true })
	email: string

	@Column({ type: "varchar" })
	password: string

	@Field()
	@Column({ type: "enum", enum: ProfileRole })
	role: ProfileRole

	@OneToOne(() => Employee, ({ asProfile }) => asProfile)
	asEmployee: Employee

	@OneToOne(() => Customer, ({ asProfile }) => asProfile)
	asCustomer: Customer

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.password = await bcrypt.hash(this.password, ENV.HASH_SALT_ROUNDS)
	}

	comparePassword(attemptPassword: string): Promise<boolean> {
		return bcrypt.compare(attemptPassword, this.password)
	}
}
