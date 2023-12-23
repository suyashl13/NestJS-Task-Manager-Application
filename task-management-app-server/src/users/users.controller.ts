import { Body, Controller, Delete, Get, Post, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SignupUserDto } from './dtos/signup-user.dto';
import { SignInResponseDto, SignInUserDto } from './dtos/signin-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from './user.entity';

@Controller('auth')
export class UsersController {

    constructor (private authService: AuthService) {}

    @Post('/sign-up')
    @Serialize(SignupUserDto)
    signUp(@Body() body: CreateUserDto) {
        return this.authService.signUpUser(body);
    }


    @Post('/sign-in')
    @Serialize(SignInResponseDto)
    async signIn(@Body() body: SignInUserDto, @Session() session: any) {
        const response = await this.authService.signInUser(body.email, body.password);
        session.token = response.token;
        return response;
    }

    @Get('whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
    }
    
    @Delete('/sign-out')
    logout(@Session() session: any) {
        session.token = null;
    }
}
