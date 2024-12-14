import { IsOptional, IsString } from "class-validator";
import { Clothes, ClothesPosition } from "../../../entities/clothes.entity";
import { PaginationParams } from "../../../helpers/pagination.helper";

export class ClothesDto {
  public id: string;
  public name: string;
  public category: string;
  public color: string;
  public size: string;
  public description: string;
  public position: ClothesPosition;
  public moved_date: string;
  public moved_time: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(payload: Clothes) {
    this.id = payload.id;
    this.name = payload.name;
    this.category = payload.clothes_category.name;
    this.color = payload.color;
    this.size = payload.size;
    this.description = payload.description;
    this.position = payload.position;
    this.moved_date = payload.moved_date;
    this.moved_time = payload.moved_time;
    this.created_at = payload.created_at;
    this.updated_at = payload.updated_at;
  }
}

export class ClothesParamsDto extends PaginationParams {
  @IsOptional()
  @IsString()
  public position?: ClothesPosition;

  @IsOptional()
  @IsString()
  public category?: string;

  @IsOptional()
  @IsString()
  public start_date?: string;

  @IsOptional()
  @IsString()
  public end_date?: string;
}
