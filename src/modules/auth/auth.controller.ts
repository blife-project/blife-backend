import { Controller, Post, Body } from "@nestjs/common";
import { RegisterPayloadDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  register(@Body() payload: RegisterPayloadDto) {
    return this.authService.register(payload);
  }
}
