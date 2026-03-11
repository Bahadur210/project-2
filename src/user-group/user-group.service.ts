import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGroup } from './user-group.entity';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>
    
  ) {}
  

async findbygroupid(id: number) {
    return this.userGroupRepository.findOne({ where: { id }, relations: ['users'] });
  }
}
