import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Jwtauthguard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiQuery({ name: 'role', required: false })
    @UseGuards(Jwtauthguard)
    @Get()
    findAll(@Query('role') role?: "admin" | "user" | "guest") {
        return this.usersService.findAll(role);
    }

    @UseGuards(Jwtauthguard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(Number(id));
    }


    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Req() req?: Request) {
    const requester = req?.['user']; 

    if (createUserDto.role === 'admin') {
      if (!requester || requester.role !== 'admin') {
        throw new ForbiddenException('You cannot create admin users');
      }
    }

    return this.usersService.create(createUserDto);
  }

    @UseGuards(Jwtauthguard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() userUpdate: CreateUserDto, @Req() req: Request) {
        const requester = req['user'];
        const targetUser = await this.usersService.findOne(Number(id));
        if (requester.role !== 'admin' && targetUser && targetUser.role === 'admin') {
            throw new ForbiddenException('You do not have permission to update this user');
        }
        return this.usersService.update(Number(id), userUpdate);
    }

    @UseGuards(Jwtauthguard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: Request) {
        const requester = req['user'];
        const targetUser = await this.usersService.findOne(Number(id));

        if (targetUser && requester.role !== 'admin' && targetUser.role === 'admin') {
            throw new ForbiddenException('You do not have permission to delete this user');
        }
        
        
        return this.usersService.delete(Number(id));
    }
}