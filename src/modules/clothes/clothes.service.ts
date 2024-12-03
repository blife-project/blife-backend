import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Pagination, PaginationResponse } from "src/helpers/pagination.helper";
import { Failed, Success } from "src/helpers/response.helper";
import { ClothesDto, ClothesParamsDto } from "./dto/clothes.dto";
import { CreateClothesPayloadDto } from "./dto/create-clothes.dto";
import {
  UpdateClothesPayloadDto,
  UpdateClothesPositionPayload,
} from "./dto/update-clothes.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Clothes } from "src/entities/clothes.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { RespMessage } from "src/helpers/message.helper";

interface IClothesService {
  findMany(
    params: ClothesParamsDto,
  ): Promise<Success<PaginationResponse<ClothesDto[]>>>;
  findOne(id: string): Promise<Success<ClothesDto>>;
  create(payloads: CreateClothesPayloadDto[]): Promise<Success<null>>;
  update(id: string, payload: UpdateClothesPayloadDto): Promise<Success<null>>;
  delete(id: string): Promise<Success<null>>;
  updatePosition(
    payloads: UpdateClothesPositionPayload[],
  ): Promise<Success<null>>;
}

@Injectable()
export class ClothesService implements IClothesService {
  constructor(
    @InjectRepository(Clothes) private clothes: Repository<Clothes>,
    @Inject(REQUEST) private req: any,
  ) {}

  async findMany(
    params: ClothesParamsDto,
  ): Promise<Success<PaginationResponse<ClothesDto[]>>> {
    try {
      const [clothes, count] = await this.clothes.findAndCount({
        where: { user: { id: this.req.user.id } },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      });

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
      const clothes = await this.clothes.findOne({
        where: { id, user: { id: this.req.user.id } },
      });

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
      await this.clothes.insert(
        payloads.map((payload) => ({ ...payload, user_id: this.req.user.id })),
      );
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
      await this.clothes.update(
        { id, user: { id: this.req.user.id } },
        payload,
      );
      return new Success(HttpStatus.OK, RespMessage.UPDATED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async delete(id: string): Promise<Success<null>> {
    try {
      await this.clothes.delete({ id, user: { id: this.req.user.id } });
      return new Success(HttpStatus.OK, RespMessage.DELETED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async updatePosition(
    payloads: UpdateClothesPositionPayload[],
  ): Promise<Success<null>> {
    try {
      await this.clothes.save(
        payloads.map((payload) => ({ ...payload, user_id: this.req.user.id })),
      );
      return new Success(HttpStatus.OK, RespMessage.UPDATED, null);
    } catch (error) {
      Failed.handle(error);
    }
  }
}
