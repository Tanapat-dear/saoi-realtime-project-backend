import { Module } from '@nestjs/common';
import { PlaneditorController } from './planeditor.controller';
import { PlaneditorService } from './planeditor.service';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@Module({
  imports:[DayjsserviceModule],
  controllers: [PlaneditorController],
  providers: [PlaneditorService, UtilsDataGetter]
})
export class PlaneditorModule {}
