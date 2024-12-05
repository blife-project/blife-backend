import { IsNotEmpty, IsString } from "class-validator";

export class CreateClothesCategoryDtoPayload {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
