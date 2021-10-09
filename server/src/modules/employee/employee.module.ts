import { BankRepository } from "#/bank/bank.repository"
import { ProfileModule } from "#/profile/profile.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { EmployeeController } from "./employee.controller"
import { EmployeeRepository } from "./employee.repository"
import { EmployeeResolver } from "./employee.resolver"
import { EmployeeService } from "./employee.service"

@Module({
	imports: [ProfileModule, TypeOrmModule.forFeature([BankRepository, EmployeeRepository])],
	providers: [EmployeeResolver, EmployeeService],
	controllers: [EmployeeController],
})
export class EmployeeModule {}
