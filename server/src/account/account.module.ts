import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountRepository } from "./account.repository"
import { AccountResolver } from "./account.resolver"
import { AccountService } from "./account.service"

@Module({
	imports: [TypeOrmModule.forFeature([AccountRepository])],
	providers: [AccountResolver, AccountService],
})
export class AccountModule {}
