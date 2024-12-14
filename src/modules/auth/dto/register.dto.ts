import { IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { IsEqualTo } from "../../../helpers/validation.helper";

export class RegisterPayloadDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Validate(IsEqualTo, ["password"])
  public confirm_password: string;
}

export class RegisterDto {
  constructor(public token: string) {}
}
