import { Controller, Get, Param } from '@nestjs/common';
import { UserGroupService } from './user-group.service';

@Controller('user-group')
export class UserGroupController {
    constructor(private groupService: UserGroupService) {}

    @Get(':id')
    async findUsersInGroup(@Param('id') id: number) {
        return this.groupService.findbygroupid(id);
    }

}
