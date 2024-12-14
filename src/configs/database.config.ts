import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DB_HOST"),
        port: Number(configService.getOrThrow("DB_PORT")),
        username: configService.getOrThrow("DB_USERNAME"),
        password: String(configService.getOrThrow("DB_PASSWORD")),
        database: configService.getOrThrow("DB_DATABASE"),
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: false,
        retryAttempts: 1,
        ssl: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfig {}
