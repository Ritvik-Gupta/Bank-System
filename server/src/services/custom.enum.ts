import { registerEnumType } from "@nestjs/graphql"

export enum ProfileRole {
	EMPLOYEE = "EMPLOYEE",
	CUSTOMER = "CUSTOMER",
}
registerEnumType(ProfileRole, { name: "ProfileRole" })

export enum AccountType {
	SAVINGS = "SAVINGS",
	FIXED = "FIXED",
}
registerEnumType(AccountType, { name: "AccountType" })
