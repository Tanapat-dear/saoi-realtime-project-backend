import { Module } from '@nestjs/common';
import { ManpowerController } from './manpower.controller';
import { ManpowerService } from './manpower.service';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@Module({
  imports:[DayjsserviceModule],
  controllers: [ManpowerController],
  providers: [ManpowerService, UtilsDataGetter]
})
export class ManpowerModule {}
