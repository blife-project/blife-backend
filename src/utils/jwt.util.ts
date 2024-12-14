import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../entities/user.entity";

export class JwtPayload {
  id: string;
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
    try {
      return this.jwt.verify<JwtPayload>(token);
    } catch {
      throw new HttpException("Unauthorized", 401);
    }
  }
}
