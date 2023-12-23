import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, ) {}

    createUser(user: CreateUserDto) {
        const usr = this.userRepository.create(user);
        return this.userRepository.save(usr);
    }


    async findOneById(id: string) {
        const user = await this.userRepository.findOne({
            where: { id: id }
        });
        return user;
    }
    
    async findOneByEmail(email: string) {
        return (await this.userRepository.findOne({
            where: { email: email }
        }));
    }

    async findOneByPhone(phone: string) {
        return (await this.userRepository.findOne({
            where: { phone: phone }
        }));
    }


}
