import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

    create(user: {name: string, email: string, role: "admin" | "user" | "guest", active: "true" | "false"}) {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async update(id: number, userUpdate: {name?: string, email?: string, role?: "admin" | "user" | "guest", active?: "true" | "false"}) {
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

}
    
    
    /*findAll(role?: "admin" | "user" | "guest") {
        let filteredUsers = this.users;
        if (role) {
            filteredUsers = filteredUsers.filter(user => user.role === role);
        }
        
        return filteredUsers;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(user: {name: string, email: string, role: "admin" | "user" | "guest", active: "true" | "false"}) {
        const newUser = { id: this.users.length + 1, ...user };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, userUpdate: {name?: string, email?: string, role?: "admin" | "user" | "guest", active?: "true" | "false"}) {
        const user = this.findOne(id);
        if (user) {
            Object.assign(user, userUpdate);
            return user;
        }
    }

    delete(id: number) {
    const removedUser = this.findOne(id);
    if (removedUser) {
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }

}*/