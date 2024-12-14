import { Module } from "@nestjs/common";
import { ClothesCategoryService } from "./clothes-category.service";
import { ClothesCategoryController } from "./clothes-category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClothesCategory } from "../../entities/clothes-category.entity";
import { JwtUtil } from "../../utils/jwt.util";
import { JwtConfig } from "../../configs/jwt.config";

@Module({
  imports: [TypeOrmModule.forFeature([ClothesCategory]), JwtConfig],
  controllers: [ClothesCategoryController],
  providers: [ClothesCategoryService, JwtUtil],
})
export class ClothesCategoryModule {}
