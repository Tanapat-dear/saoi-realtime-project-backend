import { Injectable } from '@nestjs/common';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';
@Injectable()
export class ManpowerService {
    constructor(private dayjsservice: DayjsserviceService,private utilgetter: UtilsDataGetter) {}

    async getManpower(): Promise<unknown>{
        return this.utilgetter.getManpower();
    }
}
