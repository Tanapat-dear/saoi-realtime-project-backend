import { Module } from '@nestjs/common';
import { OutputproductionService } from './outputproduction.service';
import { OutputproductionController } from './outputproduction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realtimestatus } from 'src/realtimestatus/entities/realtimestatus.entity';
import { Outputproduction } from './entities/outputproduction.entity';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';

@Module({
  imports: [TypeOrmModule.forFeature([Outputproduction],'10_17_77_118'), DayjsserviceModule],
  controllers: [OutputproductionController],
  providers: [OutputproductionService, DayjsserviceService],
})
export class OutputproductionModule {}
