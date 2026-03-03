import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Jwtstrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';


@Module({
  providers: [AuthService, Jwtstrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
