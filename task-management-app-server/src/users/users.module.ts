import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { CacheModule } from "@nestjs/cache-manager";
import { CurrentUserMiddleware } from "./middleware/current-user.middleware";

@Module({
  imports: [
    
    CacheModule.register({
      isGlobal: true
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      secretOrPrivateKey: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: "3600h",
      },
    }),
  ],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
