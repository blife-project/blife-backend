import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClothesPayloadDto {
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
  @IsOptional()
  public size?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public image_url?: string;

  @IsOptional()
  public user_id?: string;
}
