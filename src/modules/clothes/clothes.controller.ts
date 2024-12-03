import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ClothesService } from "./clothes.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/entities/user.entity";
import { RoleGuard } from "src/guards/role.guard";
import { ClothesParamsDto } from "./dto/clothes.dto";
import { CreateClothesPayloadDto } from "./dto/create-clothes.dto";
import {
  UpdateClothesPayloadDto,
  UpdateClothesPositionPayload,
} from "./dto/update-clothes.dto";

@Controller("/clothes")
@Roles(Role.USER)
@UseGuards(AuthGuard, RoleGuard)
export class ClothesController {
  constructor(private clothes: ClothesService) {}

  @Get()
  findMany(@Query() query: ClothesParamsDto) {
    return this.clothes.findMany(query);
  }

  @Get(":id")
  findOne(@Param() id: string) {
    return this.clothes.findOne(id);
  }

  @Post()
  create(@Body() payloads: CreateClothesPayloadDto[]) {
    return this.clothes.create(payloads);
  }

  @Put(":id")
  update(@Param() id: string, @Body() payload: UpdateClothesPayloadDto) {
    return this.clothes.update(id, payload);
  }

  @Delete(":id")
  delete(@Param() id: string) {
    return this.clothes.delete(id);
  }

  @Patch("position")
  updatePosition(@Body() payloads: UpdateClothesPositionPayload[]) {
    return this.clothes.updatePosition(payloads);
  }
}
