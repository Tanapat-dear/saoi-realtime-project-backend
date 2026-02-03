import { Module } from '@nestjs/common';
import { RealtimestatusService } from './realtimestatus.service';
import { RealtimestatusController } from './realtimestatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realtimestatus } from './entities/realtimestatus.entity';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';
@Module({
  imports: [TypeOrmModule.forFeature([Realtimestatus],'10_17_77_118'), DayjsserviceModule],
  controllers: [RealtimestatusController],
  providers: [RealtimestatusService],
})
export class RealtimestatusModule {}
