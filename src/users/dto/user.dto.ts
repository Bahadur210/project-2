import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['admin', 'user', 'guest'] })
  role: 'admin' | 'user' | 'guest';

  @ApiProperty()
  active: boolean;
}