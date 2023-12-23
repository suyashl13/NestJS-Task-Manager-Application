import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { Cache } from "cache-manager";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const token = req.session.token || false;

    if (token) {
      const cachedToken: string | undefined | null =
        await this.cacheManager.get(`token:${token}`);
      if (cachedToken) {
        req.currentUser = JSON.parse(cachedToken);
      } else {
        const validToken = this.jwtService.verify(token, {
          secret: process.env.SECRET_KEY,
        });
        if (validToken) {
          const { id: userId } = this.jwtService.decode(token);
          const currentUser = await this.userService.findOneById(userId);
          req.currentUser = currentUser;
          await this.cacheManager.set(
            `token:${token}`,
            JSON.stringify(currentUser),
            1000 * 60
          );
        }
      }
    }

    next();
  }
}
