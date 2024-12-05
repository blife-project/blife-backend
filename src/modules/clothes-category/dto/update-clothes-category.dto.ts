import { IsNotEmpty, IsString } from "class-validator";

export class UpdateClothesCategoryDtoPayload {
  @IsString()
  @IsNotEmpty()
  name: string;
}
