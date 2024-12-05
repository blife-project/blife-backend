import { Module } from "@nestjs/common";
import { ClothesCategoryService } from "./clothes-category.service";
import { ClothesCategoryController } from "./clothes-category.controller";

@Module({
  controllers: [ClothesCategoryController],
  providers: [ClothesCategoryService],
})
export class ClothesCategoryModule {}
