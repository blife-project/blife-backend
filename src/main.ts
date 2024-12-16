import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Failed } from "./helpers/response.helper";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = process.env.HOST ?? "localhost";
  const port = process.env.PORT ?? 3002;
  const environment = process.env.ENVIRONMENT ?? "development";
  const address = `${environment === "development" ? "http" : "https"}://${host}:${port}`;

  app.enableCors({
    origin: "http://localhost:3001",
    methods: "*",
    allowedHeaders: "Content-Type, Authorization, X-Custom-Header",
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
