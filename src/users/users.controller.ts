import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';

import { ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @ApiQuery({
    name: 'role',
    required: false,
})

    @Get() 
    findAll(
        @Query('role') role?: "admin" | "user" | "guest"
    ) {
        return this.usersService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(Number(id));
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
    
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: CreateUserDto) {

        return this.usersService.update(Number(id), userUpdate);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(Number(id));
    }


}
