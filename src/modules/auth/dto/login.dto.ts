import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginPayloadDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;
}

export class LoginDto {
  constructor(public token: string) {}
}
