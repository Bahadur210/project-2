import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable() 
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedException('Invalid credentials');
  }

  
  const payload = { sub: user.id, email: user.email, role: user.role };
  

  return {
    access_token: this.jwtService.sign(payload)
  };
}
}

