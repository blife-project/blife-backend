import { HttpException } from "@nestjs/common";

export class CFieldError extends HttpException {
  constructor(statusCode: number, field: string, message: string) {
    const error = {
      statusCode,
      message: "Custom Field Error",
      errors: [{ field, message }],
    };

    super(error, statusCode);
  }
}
