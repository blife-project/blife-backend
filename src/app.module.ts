import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseConfig } from "./configs/database.config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    AuthModule,
  ],
})
export class AppModule {}
