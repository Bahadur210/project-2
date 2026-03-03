import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    findAll(role?: "admin" | "user" | "guest") {
        if (role) {
            return this.usersRepository.find({ where: { role } });
        }
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id });
    }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = this.usersRepository.create({...createUserDto, password: hashedPassword});
        return this.usersRepository.save(newUser);
    }

    async update(id: number, userUpdate: {name?: string, email?: string, role?: "admin" | "user" | "guest", active?: boolean}) {
        const user = await this.findOne(id);
        if (user) {
            Object.assign(user, userUpdate);
            return this.usersRepository.save(user);
        }
    }

    async delete(id: number) {
        const user = await this.findOne(id);
        if (user) {
            await this.usersRepository.remove(user);
            return user;
        }
    }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }
}