import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseConfig } from "./configs/database.config";
import { ClothesModule } from "./modules/clothes/clothes.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    AuthModule,
    ClothesModule,
  ],
})
export class AppModule {}
