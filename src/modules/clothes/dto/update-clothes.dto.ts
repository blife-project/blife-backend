import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { ClothesPosition } from "src/entities/clothes.entity";

export class UpdateClothesPayloadDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public category_id: string;

  @IsString()
  @IsNotEmpty()
  public color: string;

  @IsString()
  public size?: string;

  @IsString()
  public description?: string;
}

export class UpdateClothesPositionPayload {
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  public ids: string[];

  @IsEnum(ClothesPosition, { each: true })
  @IsNotEmpty()
  public position: ClothesPosition;
}
