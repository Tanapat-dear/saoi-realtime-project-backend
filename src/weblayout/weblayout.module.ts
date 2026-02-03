import { Module } from '@nestjs/common';
import { WeblayoutService } from './weblayout.service';
import { WeblayoutController } from './weblayout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weblayout } from './entities/weblayout.entity';
import { ApiTags } from '@nestjs/swagger';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@ApiTags('SAOIlayout')
@Module({
  imports:[TypeOrmModule.forFeature([Weblayout],'10_17_77_118'), DayjsserviceModule],
  controllers: [WeblayoutController],
  providers: [WeblayoutService, DayjsserviceService, UtilsDataGetter],
})
export class WeblayoutModule {}
