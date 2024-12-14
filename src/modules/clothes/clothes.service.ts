import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import {
  Pagination,
  PaginationResponse,
} from "../../helpers/pagination.helper";
import { Failed, Success } from "../../helpers/response.helper";
import { ClothesDto, ClothesParamsDto } from "./dto/clothes.dto";
import { CreateClothesPayloadDto } from "./dto/create-clothes.dto";
import {
  UpdateClothesPayloadDto,
  UpdateClothesPositionPayload,
} from "./dto/update-clothes.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Clothes } from "../../entities/clothes.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { RespMessage } from "../../helpers/message.helper";
import { User } from "../../entities/user.entity";
import { ClothesCategory } from "../../entities/clothes-category.entity";

interface IClothesService {
  findMany(
    params: ClothesParamsDto,
  ): Promise<Success<PaginationResponse<ClothesDto[]>>>;
  findOne(id: string): Promise<Success<ClothesDto>>;
  create(payloads: CreateClothesPayloadDto[]): Promise<Success<null>>;
  update(id: string, payload: UpdateClothesPayloadDto): Promise<Success<null>>;
  delete(id: string): Promise<Success<null>>;
  updatePosition(payload: UpdateClothesPositionPayload): Promise<Success<null>>;
}

@Injectable()
export class ClothesService implements IClothesService {
  constructor(
    @InjectRepository(Clothes) private clothes: Repository<Clothes>,
    @InjectRepository(ClothesCategory)
    private clothesCategory: Repository<ClothesCategory>,
    @Inject(REQUEST) private req: any,
  ) {}

  async findMany(
    params: ClothesParamsDto,
  ): Promise<Success<PaginationResponse<ClothesDto[]>>> {
    try {
      const [clothes, count] = await this.clothes
        .createQueryBuilder("clothes")
        .leftJoinAndSelect("clothes.clothes_category", "category")
        .where({ user: { id: this.req.user.id } })
        .skip((params.page - 1) * params.limit)
        .take(params.limit)
        .select(["clothes", "category.name"])
        .getManyAndCount();

      const clothesDtos: ClothesDto[] = [];
      clothes.forEach((item) => {
        clothesDtos.push(new ClothesDto(item));
      });

      const pagination = new Pagination(count, {
        page: params.page,
        limit: params.limit,
      });
      const data = new PaginationResponse(clothesDtos, pagination);

      return new Success(HttpStatus.OK, RespMessage.LOADED, data);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async findOne(id: string): Promise<Success<ClothesDto>> {
    try {
      const clothes = await this.clothes
        .createQueryBuilder("clothes")
        .leftJoinAndSelect("clothes.clothes_category", "category")
        .where({ id, user: { id: this.req.user.id } })
        .select(["clothes", "category.name"])
        .getOne();

      if (!clothes) {
        throw new HttpException("Clothes not found", 404);
      }

      return new Success(
        HttpStatus.OK,
        RespMessage.LOADED,
        new ClothesDto(clothes),
      );
    } catch (error) {
      Failed.handle(error);
    }
  }

  async create(payloads: CreateClothesPayloadDto[]): Promise<Success<null>> {
    try {
      const today = new Date();
      const moved_date = today.toLocaleDateString("en-GB");
      const moved_time = today.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const newClothes = payloads.map((payload) => {
        const clothes = new Clothes();
        clothes.name = payload.name;
        clothes.color = payload.color;
        clothes.size = payload.size;
        clothes.description = payload.description;
        clothes.moved_date = moved_date;
        clothes.moved_time = moved_time;
        clothes.user = { id: this.req.user.id } as User;
        clothes.clothes_category = {
          id: payload.category_id,
        } as ClothesCategory;

        return clothes;
      });

      await this.clothes.insert(newClothes);

      return new Success(HttpStatus.CREATED, RespMessage.CREATED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async update(
    id: string,
    payload: UpdateClothesPayloadDto,
  ): Promise<Success<null>> {
    try {
      const { category_id, ...data } = payload;

      const category = await this.clothesCategory.findOne({
        where: { id: category_id, user: { id: this.req.user.id } },
      });

      if (!category) {
        throw new HttpException("Category not found", 404);
      }

      const clothes = await this.clothes.findOne({
        where: { id, user: { id: this.req.user.id } },
      });

      if (!clothes) {
        throw new HttpException("Clothes not found", 404);
      }

      await this.clothes.update(
        { id, user: { id: this.req.user.id } },
        {
          ...data,
          clothes_category: { id: category_id },
        },
      );

      return new Success(HttpStatus.OK, RespMessage.UPDATED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async delete(id: string): Promise<Success<null>> {
    try {
      const clothes = await this.clothes.findOne({
        where: { id, user: { id: this.req.user.id } },
      });

      if (!clothes) {
        throw new HttpException("Clothes not found", 404);
      }

      await this.clothes.remove(clothes);
      return new Success(HttpStatus.OK, RespMessage.DELETED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async updatePosition(
    payload: UpdateClothesPositionPayload,
  ): Promise<Success<null>> {
    try {
      const today = new Date();
      const moved_date = today.toLocaleDateString("en-GB");
      const moved_time = today.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const newPayloads = payload.ids.map((id) => {
        const clothes = new Clothes();
        clothes.id = id;
        clothes.position = payload.position;
        clothes.user = { id: this.req.user.id } as User;
        clothes.moved_date = moved_date;
        clothes.moved_time = moved_time;

        return clothes;
      });

      await this.clothes.save(newPayloads);

      return new Success(HttpStatus.OK, RespMessage.UPDATED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }
}
