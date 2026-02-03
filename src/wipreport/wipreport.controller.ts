import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { WipreportService } from './wipreport.service';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';

@Controller('api/wipreport')
export class WipreportController {
    constructor(private wipreportservice: WipreportService, private readonly dayjsservice: DayjsserviceService) {}

    @Get()
    async getWipReport() {
        return {
            status: 200,
            data: await this.wipreportservice.getWipReportData(),
            timestamp: this.dayjsservice.now(),
        };
    }
}
