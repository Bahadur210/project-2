import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

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
    create(@Body() user: {name: string, email: string, role: "admin" | "user" | "guest", active: "true" | "false"}) {
    
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {name?: string, email?: string, role?: "admin" | "user" | "guest", active?: "true" | "false"}) {

        return this.usersService.update(Number(id), userUpdate);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(Number(id));
    }


}
