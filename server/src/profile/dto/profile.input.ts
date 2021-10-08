import { ProfileHollow } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { Length } from "class-validator"
import { ProfileLoginInput } from "./profile-login.input"

@InputType()
export class ProfileInput extends ProfileLoginInput implements Partial<ProfileHollow> {
	@Field()
	@Length(3, 20)
	firstName: string

	@Field()
	@Length(3, 20)
	lastName: string
}
