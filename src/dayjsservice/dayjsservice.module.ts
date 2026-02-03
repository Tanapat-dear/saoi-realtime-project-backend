import { Module , Global } from '@nestjs/common';
import { DayjsserviceService } from './dayjsservice.service';

@Global()
@Module({
  controllers: [],
  providers: [DayjsserviceService],
  exports: [DayjsserviceService],
})
export class DayjsserviceModule {}