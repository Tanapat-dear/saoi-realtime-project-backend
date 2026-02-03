import { Injectable } from '@nestjs/common';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private readonly dayjsservice: DayjsserviceService, private readonly utildatagetter: UtilsDataGetter){}

    async findOne(username:string): Promise<any>{
       
        const user = await this.utildatagetter.findUser(username);
        if (!user) {
            throw new NotFoundException(`User with username "${username}" not found`);
        }
        return user
    }

}
