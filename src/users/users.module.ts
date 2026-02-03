import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';

@Module({
  imports:[DayjsserviceModule,],
  providers: [UsersService, UtilsDataGetter],
  exports:[UsersService]
})
export class UsersModule {}
