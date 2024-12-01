import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ValidationError } from "class-validator";

export class Success<T> {
  constructor(
    public statusCode: number,
    public message: string = "Success",
    public data?: T,
  ) {}
}

export class Failed {
  static handle(error: Error | ValidationError[]) {
    const logger = new Logger();
    logger.error(error);

    if (error instanceof HttpException) {
      throw error;
    }

    if (
      Array.isArray(error) &&
      (error as ValidationError[]).every(
        (item) => item instanceof ValidationError,
      )
    ) {
      const errors = (error as ValidationError[]).map((item) => {
        let message: string;

        if (item.constraints.isNotEmpty) {
          message = item.constraints.isNotEmpty;
        } else {
          message = item.constraints[Object.keys(item.constraints)[0]];
        }

        message =
          `${message.charAt(0).toUpperCase()}${message.slice(1)}`.replace(
            "_",
            " ",
          );

        return {
          field: item.property,
          message,
        };
      });

      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Validation Error",
        errors,
      });
    }

    throw new HttpException(
      "Internal Server Error",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
