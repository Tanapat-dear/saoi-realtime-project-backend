import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags , ApiOperation, ApiOkResponse } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('App')
  @Get()
  @ApiOperation({ summary: 'Test that Backend server is Online' })
  @ApiOkResponse({ description: 'Returns Some Strings' })
  getHello(): string {
    return this.appService.getHello();
  }
}
