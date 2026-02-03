import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWeblayoutDto } from './dto/create-weblayout.dto';
import { UpdateWeblayoutDto } from './dto/update-weblayout.dto';
import { InjectDataSource, InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weblayout } from './entities/weblayout.entity';
import { timestamp } from 'rxjs';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';
@Injectable()
export class WeblayoutService {
  constructor(
    @InjectRepository(Weblayout, '10_17_77_118')
    private readonly weblayoutRepository: Repository<Weblayout>,
    private utilgetter: UtilsDataGetter,
    private readonly dayjsservice: DayjsserviceService,
  ) {}
  create(createWeblayoutDto: CreateWeblayoutDto) {
    return 'This action adds a new weblayout';
  }


  async findAll() {
  try {
    const saoi_layout = await this.weblayoutRepository.find({
      order: {
        row: 'ASC',
      },
    });

    const saoi_layout_parse = saoi_layout.map((item) => {
      // ฟังก์ชันช่วยจัดการข้อมูลให้เป็น Array ที่ถูกต้อง
      const formatToArray = (input: any) => {
        // 1. ถ้าไม่ใช่ string (เช่น TypeORM parse มาเป็น array ให้แล้ว) ให้ส่งคืนเลย
        if (typeof input !== 'string') return input;
        
        // 2. ถ้าเป็นรูปแบบ Postgres Array "{val1,val2}" ให้แปลงเป็น "[val1,val2]"
        let target = input;
        if (input.startsWith('{') && input.endsWith('}')) {
          target = input.replace('{', '[').replace('}', ']');
        }

        try {
          return JSON.parse(target);
        } catch (e) {
          // 3. กรณีเป็น string ธรรมดาที่ไม่ได้เป็น JSON หรือ Postgres Array
          // เช่น "R2-34-38" ให้คืนค่าเป็นอาเรย์ที่มีค่านั้นอยู่
          return [input];
        }
      };

      return {
        ...item,
        machine: formatToArray(item.machine),
        manpower_layout: formatToArray(item.manpower_layout), // 🛠️ จัดการส่วนนี้ด้วย
      };
    });

    if (!saoi_layout_parse || saoi_layout_parse.length === 0) {
      throw new HttpException('No layout found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'OK',
      data: saoi_layout_parse,
      timestamp: this.dayjsservice.now(),
    };
  } catch (error) {
    if (error instanceof HttpException) throw error;
    
    console.error('Error fetching weblayout:', error);
    throw new HttpException('Failed to fetch layout', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}



  findOne(id: number) {
    return `This action returns a #${id} weblayout`;
  }

  async update(updateDto: any) {
    return this.utilgetter.updateMachineLayout(updateDto.data);
  }

  remove(id: number) {
    return `This action removes a #${id} weblayout`;
  }
}
