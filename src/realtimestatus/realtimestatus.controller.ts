import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RealtimestatusService } from './realtimestatus.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { CreateRealtimestatusDto } from './dto/create-realtimestatus.dto';
import { UpdateRealtimestatusDto } from './dto/update-realtimestatus.dto';

@ApiTags('Realtimestatus')
@Controller('api/realtimestatus')
export class RealtimestatusController {
  constructor(private readonly realtimestatusService: RealtimestatusService) {}

  @Get()
  @ApiOkResponse({ description: 'Fetch all realtimestatus records successfully.' })
  @ApiOperation({ summary: 'Get all realtimestatus records' })
  findAll() {
    return this.realtimestatusService.findAll();
  }

}
