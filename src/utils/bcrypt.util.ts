import { Injectable } from "@nestjs/common";
import { compareSync, hashSync } from "bcrypt";

@Injectable()
export class BcryptUtil {
  hash(password: string): string {
    const salt = 10;
    return hashSync(password, salt);
  }

  compare(password: string, hashPassword: string): boolean {
    return compareSync(password, hashPassword);
  }
}
