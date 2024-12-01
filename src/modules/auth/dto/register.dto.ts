import { IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { IsEqualTo } from "src/helpers/validation.helper";

export class RegisterPayloadDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Validate(IsEqualTo, ["password"])
  confirm_password: string;
}

export class RegisterDto {
  constructor(public token: string) {}
}
