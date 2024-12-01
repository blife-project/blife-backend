import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegisterDto, RegisterPayloadDto } from "./dto/register.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";
import { Failed, Success } from "src/helpers/response.helper";
import { JwtUtil } from "src/utils/jwt.util";
import { BcryptUtil } from "src/utils/bcrypt.util";

interface IAuthService {
  register(payload: RegisterPayloadDto): Promise<Success<RegisterDto>>;
  // login(payload: LoginPayloadDto): Promise<LoginDto>
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(Auth)
    private auth: Repository<Auth>,
    private jwt: JwtUtil,
    private bcrypt: BcryptUtil,
  ) {}

  async register(payload: RegisterPayloadDto): Promise<Success<RegisterDto>> {
    try {
      const existUser = await this.auth.findOne({
        where: { username: payload.username },
      });

      if (existUser) {
        throw new HttpException(
          "Username already exist",
          HttpStatus.BAD_REQUEST,
        );
      }

      payload.password = this.bcrypt.hash(payload.password);

      const user = this.auth.create(payload);
      const res = await this.auth.save(user);

      const token = this.jwt.generate({
        username: res.username,
        role: res.role,
      });
      const data = new RegisterDto(token);

      return new Success<RegisterDto>(201, "Success", data);
    } catch (error) {
      Failed.handle(error);
    }
  }
}
