import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClothesCategory } from "../../entities/clothes-category.entity";
import { Clothes } from "../../entities/clothes.entity";
import { User } from "../../entities/user.entity";
import { ClothesService } from "./clothes.service";
import { ClothesController } from "./clothes.controller";
import { JwtUtil } from "../../utils/jwt.util";
import { JwtConfig } from "../../configs/jwt.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Clothes, ClothesCategory]),
    JwtConfig,
  ],
  controllers: [ClothesController],
  providers: [ClothesService, JwtUtil],
})
export class ClothesModule {}
