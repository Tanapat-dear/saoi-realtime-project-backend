import { Module } from '@nestjs/common';
import { ProductionController } from './production.controller';
import { ProductionService } from './production.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@Module({
    imports:[TypeOrmModule.forFeature([],'10_17_77_118'), DayjsserviceModule,],
    controllers: [ProductionController],
    providers: [ProductionService,UtilsDataGetter],
})

export class ProductionModule {}
