import { Controller , Get, } from '@nestjs/common';
import { ProductnameService } from './productname.service';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';

@Controller('api/production/productname')
export class ProductnameController {

    constructor(private readonly productnameservice: ProductnameService, private dayjsservice: DayjsserviceService){}

    @Get()
    getProductname(): any {
        return this.productnameservice.getProductname()
    }


}
