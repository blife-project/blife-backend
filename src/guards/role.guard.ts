import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/entities/user.entity";
import { Failed } from "src/helpers/response.helper";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const req = context.switchToHttp().getRequest();
      const role = req.user.role;
      const roles =
        this.reflector.get<Role[]>("roles", context.getHandler()) ||
        this.reflector.get<Role[]>("roles", context.getClass());

      if (!roles.includes(role)) {
        throw new HttpException("Forbiddend access", HttpStatus.FORBIDDEN);
      }

      return true;
    } catch (error) {
      Failed.handle(error);
    }
  }
}
