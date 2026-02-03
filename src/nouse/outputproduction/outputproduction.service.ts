import { BadRequestException, HttpException , HttpStatus, Injectable } from '@nestjs/common';
import { CreateOutputproductionDto } from './dto/create-outputproduction.dto';
import { UpdateOutputproductionDto } from './dto/update-outputproduction.dto';
import { Outputproduction } from './entities/outputproduction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
@Injectable()
export class OutputproductionService {

  constructor(
    @InjectRepository(Outputproduction, '10_17_77_118')
    private readonly outputproductionRepository: Repository<Outputproduction>,
    private readonly dayjsService: DayjsserviceService,
  ) {}
  async findAll() {
    return this.outputproductionRepository.find();
  }

  async findProcess(process: string) {

    const data = await this.outputproductionRepository.find({
      where: { proc_disp: Like(`%${process}%`) },
    });

    if (data.length === 0) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Process not found',
      },
      HttpStatus.BAD_REQUEST);
    }
    return {
      status: 'OK',
      data,
      timestamp: this.dayjsService.now(),
    };
  
    
  }

}
