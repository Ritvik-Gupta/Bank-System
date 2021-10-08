import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProfileRepository } from "./profile.repository"
import { ProfileResolver } from "./profile.resolver"
import { ProfileService } from "./profile.service"

@Module({
	imports: [TypeOrmModule.forFeature([ProfileRepository])],
	providers: [ProfileService, ProfileResolver],
	exports: [ProfileService],
})
export class ProfileModule {}
