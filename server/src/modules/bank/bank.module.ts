import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BankController } from "./bank.controller"
import { BankRepository } from "./bank.repository"
import { BankResolver } from "./bank.resolver"
import { BankService } from "./bank.service"

@Module({
	imports: [TypeOrmModule.forFeature([BankRepository])],
	providers: [BankService, BankResolver],
	controllers: [BankController],
})
export class BankModule {}
