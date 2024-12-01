import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { JwtUtil } from "src/utils/jwt.util";
import { BcryptUtil } from "src/utils/bcrypt.util";
import { JwtConfig } from "src/configs/jwt.config";

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), JwtConfig],
  controllers: [AuthController],
  providers: [AuthService, JwtUtil, BcryptUtil],
})
export class AuthModule {}
