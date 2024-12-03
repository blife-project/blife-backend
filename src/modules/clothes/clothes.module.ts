import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClothesCategory } from "src/entities/clothes-category.entity";
import { Clothes } from "src/entities/clothes.entity";
import { User } from "src/entities/user.entity";
import { ClothesService } from "./clothes.service";
import { ClothesController } from "./clothes.controller";
import { JwtUtil } from "src/utils/jwt.util";
import { JwtConfig } from "src/configs/jwt.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Clothes, ClothesCategory]),
    JwtConfig,
  ],
  controllers: [ClothesController],
  providers: [ClothesService, JwtUtil],
})
export class ClothesModule {}
