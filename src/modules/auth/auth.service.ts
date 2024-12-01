import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegisterDto, RegisterPayloadDto } from "./dto/register.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { Failed, Success } from "src/helpers/response.helper";
import { JwtUtil } from "src/utils/jwt.util";
import { BcryptUtil } from "src/utils/bcrypt.util";
import { LoginDto, LoginPayloadDto } from "./dto/login.dto";
import { CFieldError } from "src/helpers/custom-error.helper";

interface IAuthService {
  register(payload: RegisterPayloadDto): Promise<Success<RegisterDto>>;
  login(payload: LoginPayloadDto): Promise<Success<LoginDto>>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    private jwt: JwtUtil,
    private bcrypt: BcryptUtil,
  ) {}

  async register(payload: RegisterPayloadDto): Promise<Success<RegisterDto>> {
    try {
      const existUser = await this.user.findOne({
        where: { username: payload.username },
      });

      if (existUser) {
        throw new HttpException(
          "Username already exist",
          HttpStatus.BAD_REQUEST,
        );
      }

      payload.password = this.bcrypt.hash(payload.password);

      const user = this.user.create(payload);
      const res = await this.user.save(user);

      const token = this.jwt.generate({
        username: res.username,
        role: res.role,
      });
      const data = new RegisterDto(token);

      return new Success(201, "Success", data);
    } catch (error) {
      Failed.handle(error);
    }
  }

  async login(payload: LoginPayloadDto): Promise<Success<LoginDto>> {
    try {
      const user = await this.user.findOne({
        where: { username: payload.username },
      });
      if (!user) {
        throw new CFieldError(
          HttpStatus.NOT_FOUND,
          "username",
          "Username not found",
        );
      }

      if (!this.bcrypt.compare(payload.password, user.password)) {
        throw new CFieldError(
          HttpStatus.NOT_FOUND,
          "password",
          "Incorrect password",
        );
      }

      const token = this.jwt.generate({
        username: user.username,
        role: user.role,
      });
      const data = new LoginDto(token);

      return new Success(HttpStatus.OK, "Success", data);
    } catch (error) {
      Failed.handle(error);
    }
  }
}
