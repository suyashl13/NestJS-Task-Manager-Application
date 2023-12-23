import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { compare, genSaltSync, hashSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUpUser(newUser: CreateUserDto) {
    const [userByEmail, userByPhone] = [
      await this.userService.findOneByEmail(newUser.email),
      await this.userService.findOneByPhone(newUser.phone),
    ];

    if (userByEmail) {
      throw new BadRequestException(
        `User with ${newUser.email} already exists`
      );
    }

    if (userByPhone) {
      throw new BadRequestException(
        `User with ${newUser.phone} already exists`
      );
    }

    const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const hashOfPassword = hashSync(newUser.password, salt);

    newUser.password = hashOfPassword;
    return this.userService.createUser(newUser);
  }

  async signInUser(email: string, password: string) {
    const targetUser = await this.userService.findOneByEmail(email);

    if (!targetUser) {
      throw new BadRequestException(`User with email ${email} not found.`);
    }

    const correctPassword = await compare(password, targetUser.password);

    if (!correctPassword) {
      throw new BadRequestException("Provided wrong password");
    }

    const token = this.jwtService.sign({ id: targetUser.id }, {
      secret: process.env.SECRET_KEY
    });

    return {
      token: token,
      user: targetUser,
    };
  }
}
