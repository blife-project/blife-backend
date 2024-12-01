import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { User } from "../entities/user.entity";

config();
const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: "postgres",
  host: configService.getOrThrow("DB_HOST"),
  port: Number(configService.getOrThrow("DB_PORT")),
  username: configService.getOrThrow("DB_USERNAME"),
  password: String(configService.getOrThrow("DB_PASSWORD")),
  database: configService.getOrThrow("DB_DATABASE"),
  synchronize: false,
  migrations: ["src/migrations/*-migration.ts"],
  entities: [User],
});

export default AppDataSource;
