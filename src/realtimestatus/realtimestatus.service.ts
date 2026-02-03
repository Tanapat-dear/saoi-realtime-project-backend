import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRealtimestatusDto } from './dto/create-realtimestatus.dto';
import { UpdateRealtimestatusDto } from './dto/update-realtimestatus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Realtimestatus } from './entities/realtimestatus.entity';
import dayjs from 'dayjs'
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';


@Injectable()
export class RealtimestatusService {
  
  constructor(
    @InjectRepository(Realtimestatus,'10_17_77_118')
    private RealtimestatusRepository: Repository<Realtimestatus>,
    private Dayjsprovider: DayjsserviceService,
  ) {}

  async findAll() {
    try{
      const data = await this.RealtimestatusRepository.find()

      return {
        status:'OK',
        data,
        timestamp: this.Dayjsprovider.now()
      }
    }

    catch(error){
      throw new HttpException({
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error: 'Cannot fetch realtimestatus data',
          detail: error.message,
        }
        ,HttpStatus.SERVICE_UNAVAILABLE)
    };
  }

}
