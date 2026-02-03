import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@Injectable()
export class WipreportService {
   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,private utilgetter: UtilsDataGetter) {}
    async getWipReportData() {
        let data = await this.cacheManager.get('wip_report_data');
        if(!data || (Array.isArray(data) && data.length === 0)){
            data = await this.utilgetter.getWipReport();
            await this.cacheManager.set('wip_report_data', data, 300000);
        }
        return data;
    }
}
