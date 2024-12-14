import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { JwtUtil } from "../../utils/jwt.util";
import { BcryptUtil } from "../../utils/bcrypt.util";
import { JwtConfig } from "../../configs/jwt.config";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtConfig],
  controllers: [AuthController],
  providers: [AuthService, JwtUtil, BcryptUtil],
})
export class AuthModule {}
