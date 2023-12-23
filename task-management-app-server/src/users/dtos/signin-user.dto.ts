import { Expose } from "class-transformer"
import { IsEmail, IsString, Length } from "class-validator"
import { SignupUserDto } from "./signup-user.dto"
import { User } from "../user.entity"

export class SignInUserDto {
    @IsEmail()
    email: string

    @IsString()
    @Length(6, 30, {message: 'Password should be at least greater than 6 chars and smaller than 30 chars'})
    password: string
}

export class SignInResponseDto {
    @Expose()
    token: string
}