import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { OeeService } from './oee.service';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';

@Controller('api/oee')
export class OeeController {
    constructor(private readonly oeeService: OeeService , private readonly dayjsservice: DayjsserviceService) {}

    @Get()
    async getoee(){
        return {
            status: 200,
            data: await this.oeeService.getoeedata(),
            timestamp: this.dayjsservice.now(),
        };
    }
}
