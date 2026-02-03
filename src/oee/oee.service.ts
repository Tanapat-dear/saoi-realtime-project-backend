import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { DataSource } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@Injectable()
export class OeeService {
    
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,private utilgetter: UtilsDataGetter) {}
    
    async getoeedata(): Promise<unknown> {
            let data = await this.cacheManager.get('oee_data');
            if(!data){
                data = await this.utilgetter.getOeeData();
                await this.cacheManager.set('oee_data', data, 180000);
            }
            
            return data;
    }
}
