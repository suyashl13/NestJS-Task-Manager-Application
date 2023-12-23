import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    city: string;

    @IsString()
    @Length(12)
    phone: string;
    designation: string;
}