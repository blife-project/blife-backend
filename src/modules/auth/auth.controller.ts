import { Controller, Post, Body } from "@nestjs/common";
import { RegisterPayloadDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { LoginPayloadDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  register(@Body() payload: RegisterPayloadDto) {
    return this.authService.register(payload);
  }

  @Post("login")
  login(@Body() payload: LoginPayloadDto) {
    return this.authService.login(payload);
  }
}
