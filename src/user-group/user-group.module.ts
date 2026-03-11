import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroup } from './user-group.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGroup, User])],
  providers: [UserGroupService],
  controllers: [UserGroupController]
})
export class UserGroupModule {}
