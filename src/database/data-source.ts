import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { User } from "../entities/user.entity";
import { Clothes } from "../entities/clothes.entity";
import { ClothesCategory } from "../entities/clothes-category.entity";

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
  migrations: ["./migrations/*-migration.ts"],
  entities: [User, Clothes, ClothesCategory],
  ssl: true,
});

export default AppDataSource;
