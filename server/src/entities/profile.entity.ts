import { ENV, IAuthProfile, ProfileRole } from "$$"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Customer } from "./customer.entity"
import { Employee } from "./employee.entity"

@ObjectType()
export class ProfileHollow implements IAuthProfile {
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

	@Field(() => String, { complexity: 4 })
	get accessToken(): string {
		const payload: IAuthProfile = { id: this.id, email: this.email, role: this.role }
		return jwt.sign(payload, ENV.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRY,
		})
	}

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.password = await bcrypt.hash(this.password, ENV.HASH_SALT_ROUNDS)
	}

	comparePassword(attemptPassword: string): Promise<boolean> {
		return bcrypt.compare(attemptPassword, this.password)
	}
}

@ObjectType()
@Entity()
export class Profile extends ProfileHollow {
	@OneToOne(() => Employee, ({ asProfile }) => asProfile)
	asEmployee: Employee

	@OneToOne(() => Customer, ({ asProfile }) => asProfile)
	asCustomer: Customer
}
