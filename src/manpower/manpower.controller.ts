import { Controller ,Get } from '@nestjs/common';
import { ManpowerService } from './manpower.service';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';


@Controller('api/manpower')
export class ManpowerController {

    constructor(private readonly manpowerservice: ManpowerService, private readonly dayjsservice: DayjsserviceService){}
    @Get()
    async getManpower(): Promise<unknown> {
        return {
            status: 'OK',
            data: await this.manpowerservice.getManpower(),
            timestamp: this.dayjsservice.now(),
        }
    }

}
