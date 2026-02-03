import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ProductionService } from './production.service';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';

@Controller('api/production')
export class ProductionController {
    constructor(private readonly productionService: ProductionService, private readonly dayjsservice: DayjsserviceService){}

    @Get()
    async getProductiondata(){
        return {
            status: 200,
            data: await this.productionService.getProductionData(),
            timestamp: this.dayjsservice.now(),
        }
    }
}
