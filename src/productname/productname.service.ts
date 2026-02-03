import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class ProductnameService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache ,private readonly httpService: HttpService){}

   async getProductname(): Promise<any> {
        let cachedData = await this.cacheManager.get('productname');
        if (cachedData) {
            return cachedData;
        }
        try {
            const response = await firstValueFrom(
                this.httpService.get('http://10.17.66.242:7010/v1.1/api/common/machine-real-time')
            );
            const dataToCache = response.data;
            await this.cacheManager.set('productname', dataToCache, 120000);
            return dataToCache;

        } catch (error) {
            console.error('API Error:', error.message);
            throw error;
        }
    }
}