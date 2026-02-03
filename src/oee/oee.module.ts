import { Module } from '@nestjs/common';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { OeeService } from './oee.service';
import { OeeController } from './oee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';


@Module({
  imports: [TypeOrmModule.forFeature([],'10_17_66_121'), DayjsserviceModule],
  controllers: [OeeController],
  providers: [OeeService, DayjsserviceService, UtilsDataGetter],
})
export class OeeModule {}