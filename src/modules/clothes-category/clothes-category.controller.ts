import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ClothesCategoryService } from "./clothes-category.service";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/entities/user.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { CreateClothesCategoryDtoPayload } from "./dto/create-clothes-category.dto";
import { UpdateClothesCategoryDtoPayload } from "./dto/update-clothes-category.dto";

@Roles(Role.USER)
@UseGuards(AuthGuard, RoleGuard)
@Controller("clothes-categories")
export class ClothesCategoryController {
  constructor(
    private readonly clothesCategoriesService: ClothesCategoryService,
  ) {}

  @Get()
  findMany() {
    return this.clothesCategoriesService.findMany();
  }

  @Get(":id")
  findOne(@Param() id: string) {
    return this.clothesCategoriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateClothesCategoryDtoPayload) {
    return this.clothesCategoriesService.create(payload);
  }

  @Put(":id")
  update(
    @Param() id: string,
    @Body() payload: UpdateClothesCategoryDtoPayload,
  ) {
    return this.clothesCategoriesService.update(id, payload);
  }

  @Delete(":id")
  delete(@Param() id: string) {
    return this.clothesCategoriesService.delete(id);
  }
}
