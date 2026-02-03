import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@Injectable()
export class ProductionService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,private utilgetter: UtilsDataGetter) {}

    async getProductionData(): Promise<unknown>{
        let data = await this.cacheManager.get('production_data');
        if (!data){
            data = await this.utilgetter.getProductionData();
            await this.cacheManager.set('production_data', data, 1200000);
        }
        return data;
    }
}
