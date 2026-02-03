import { Controller, Get, Post, Body, Patch, Param, Delete , Query} from '@nestjs/common';
import { OutputproductionService } from './outputproduction.service';
import { CreateOutputproductionDto } from './dto/create-outputproduction.dto';
import { UpdateOutputproductionDto } from './dto/update-outputproduction.dto';

@Controller('/api/outputproduction')
export class OutputproductionController {
  constructor(private readonly outputproductionService: OutputproductionService) {}

 

  @Get()
  findAll() {
    return this.outputproductionService.findAll();
  }

  @Get(':process')
  findProcess(@Param('process') process: string) {
    return this.outputproductionService.findProcess(process);
  }

 
}
