import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Failed } from "../helpers/response.helper";
import { JwtUtil } from "../utils/jwt.util";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtUtil) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req.headers.authorization as string;
      if (!token)
        throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

      const data = this.jwt.verify(token.split(" ")[1]);
      req.user = data;

      return true;
    } catch (error) {
      Failed.handle(error);
    }
  }
}
