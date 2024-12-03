import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
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
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsEnum(ClothesPosition)
  @IsNotEmpty()
  public position: ClothesPosition;

  @IsOptional()
  public user_id?: string;
}
