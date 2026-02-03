import { Module } from '@nestjs/common';
import { WipreportController } from './wipreport.controller';
import { WipreportService } from './wipreport.service';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@Module({
    imports: [TypeOrmModule.forFeature([],'10_17_77_118'), DayjsserviceModule],
    controllers: [WipreportController],
    providers: [WipreportService,DayjsserviceService, UtilsDataGetter],
})
export class WipreportModule {}