import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Failed, Success } from "../../helpers/response.helper";
import { ClothesCategoryDto } from "./dto/clothes-category.dto";
import { CreateClothesCategoryDtoPayload } from "./dto/create-clothes-category.dto";
import { UpdateClothesCategoryDtoPayload } from "./dto/update-clothes-category.dto";
import { Repository } from "typeorm";
import { ClothesCategory } from "../../entities/clothes-category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { REQUEST } from "@nestjs/core";
import { RespMessage } from "../../helpers/message.helper";

interface IClothesCategoryService {
  findMany(): Promise<Success<ClothesCategoryDto[]>>;
  findOne(id: string): Promise<Success<ClothesCategoryDto>>;
  create(payload: CreateClothesCategoryDtoPayload): Promise<Success<null>>;
  update(
    id: string,
    payload: UpdateClothesCategoryDtoPayload,
  ): Promise<Success<null>>;
  delete(id: string): Promise<Success<null>>;
}

@Injectable()
export class ClothesCategoryService implements IClothesCategoryService {
  constructor(
    @InjectRepository(ClothesCategory)
    private clothesCategory: Repository<ClothesCategory>,
    @Inject(REQUEST) private req: any,
  ) {}

  async findMany(): Promise<Success<ClothesCategoryDto[]>> {
    try {
      const userId = this.req.user.id;

      const clothesCategories = await this.clothesCategory.find({
        where: { user: { id: userId } },
      });

      const data: ClothesCategoryDto[] = clothesCategories.map(
        (item) => new ClothesCategoryDto(item),
      );
      return new Success(HttpStatus.OK, RespMessage.LOADED, data);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async findOne(id: string): Promise<Success<ClothesCategoryDto>> {
    try {
      const userId = this.req.user.id;

      const clothesCategory = await this.clothesCategory.findOne({
        where: { id, user: { id: userId } },
      });

      if (!clothesCategory) {
        throw new HttpException("Clothes category not found", 400);
      }

      const data: ClothesCategoryDto = new ClothesCategoryDto(clothesCategory);
      return new Success(HttpStatus.OK, RespMessage.LOADED, data);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async create(
    payload: CreateClothesCategoryDtoPayload,
  ): Promise<Success<null>> {
    try {
      const userId = this.req.user.id;

      const entity = this.clothesCategory.create({
        ...payload,
        user: { id: userId },
      });
      await this.clothesCategory.save(entity);

      return new Success(HttpStatus.CREATED, RespMessage.CREATED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async update(
    id: string,
    payload: UpdateClothesCategoryDtoPayload,
  ): Promise<Success<null>> {
    try {
      const userId = this.req.user.id;

      const clothesCategory = await this.clothesCategory.findOne({
        where: { id, user: { id: userId } },
      });

      if (!clothesCategory) {
        throw new HttpException(RespMessage.NOTFOUND, HttpStatus.NOT_FOUND);
      }

      await this.clothesCategory.update({ id, user: { id: userId } }, payload);

      return new Success(HttpStatus.OK, RespMessage.UPDATED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async delete(id: string): Promise<Success<null>> {
    try {
      const userId = this.req.user.id;

      const clothesCategory = await this.clothesCategory.findOne({
        where: { id, user: { id: userId } },
      });

      if (!clothesCategory) {
        throw new HttpException(RespMessage.NOTFOUND, HttpStatus.NOT_FOUND);
      }

      await this.clothesCategory.remove(clothesCategory);
      return new Success(HttpStatus.OK, RespMessage.DELETED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }
}
