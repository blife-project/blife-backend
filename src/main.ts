import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Failed } from "./helpers/response.helper";
import { NextFunction, Request, Response } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = process.env.HOST ?? "localhost";
  const port = process.env.PORT ?? 3002;
  const environment = process.env.ENVIRONMENT ?? "development";
  const address = `${environment === "development" ? "http" : "https"}://${host}:${port}`;

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        Failed.handle(errors);
      },
      transform: true,
    }),
  );

  await app.listen(port, () => {
    console.log(`Your app is running on ${address}`);
  });
}
bootstrap();
