import { Module } from '@nestjs/common';
import { ProductnameController } from './productname.controller';
import { ProductnameService } from './productname.service';
import { HttpModule } from '@nestjs/axios';
import { DayjsserviceModule } from 'src/dayjsservice/dayjsservice.module';

@Module({
  imports: [HttpModule, DayjsserviceModule],
  controllers: [ProductnameController],
  providers: [ProductnameService]
})
export class ProductnameModule {}
