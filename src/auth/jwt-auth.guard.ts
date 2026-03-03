import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Jwtauthguard extends AuthGuard('jwt') {}