import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { Account } from "./account.entity"
import { Profile } from "./profile.entity"

@ObjectType()
export class CustomerHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	profileId: string

	@Field()
	@Column({ type: "varchar" })
	address: string
}

@ObjectType()
@Entity()
export class Customer extends CustomerHollow {
	@Field(() => Profile)
	@OneToOne(() => Profile, ({ asCustomer }) => asCustomer)
	@JoinColumn({ name: "profileId", referencedColumnName: "id" })
	asProfile: Profile

	@Field(() => [Account])
	@OneToMany(() => Account, ({ forCustomer }) => forCustomer)
	havingAccounts: Account[]
}
