import { ProfileHollow } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, MinLength } from "class-validator"

@InputType()
export class ProfileLoginInput implements Partial<ProfileHollow> {
	@Field()
	@IsEmail()
	email: string

	@Field()
	@MinLength(5)
	password: string
}
