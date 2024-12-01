import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/entities/user.entity";

export class JwtPayload {
  username: string;
  role: Role;
}

@Injectable()
export class JwtUtil {
  constructor(private jwt: JwtService) {}

  generate(payload: JwtPayload): string {
    return this.jwt.sign(payload);
  }

  verify(token: string): JwtPayload {
    return this.jwt.verify<JwtPayload>(token);
  }
}
