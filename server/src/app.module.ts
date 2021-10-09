import { BankModule } from "#/bank/bank.module"
import { CustomerModule } from "#/customer/customer.module"
import { EmployeeModule } from "#/employee/employee.module"
import { ProfileModule } from "#/profile/profile.module"
import { ENV, gqlFormatError, IContext } from "$$"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AccountModule } from "./modules/account/account.module"

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: ENV.DATABASE_URL,
			synchronize: !ENV.IN_PRODUCTION,
			logging: !ENV.IN_PRODUCTION,
			autoLoadEntities: true,
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: ENV.IN_PRODUCTION || "./src/schema.gql",
			context: ({ req }): IContext => ({ req }),
			formatError: gqlFormatError,
			playground: !ENV.IN_PRODUCTION,
		}),
		ProfileModule,
		EmployeeModule,
		CustomerModule,
		BankModule,
		AccountModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
