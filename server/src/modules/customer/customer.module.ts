import { ProfileModule } from "#/profile/profile.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CustomerRepository } from "./customer.repository"
import { CustomerResolver } from "./customer.resolver"
import { CustomerService } from "./customer.service"

@Module({
	imports: [ProfileModule, TypeOrmModule.forFeature([CustomerRepository])],
	providers: [CustomerResolver, CustomerService],
})
export class CustomerModule {}
