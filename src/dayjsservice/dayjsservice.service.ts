import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';


@Injectable()
export class DayjsserviceService {
  // คืนค่าเวลาปัจจุบันแบบ "YYYY-MM-DD HH:mm:ss.SSS"

  now(): string {
    return dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
  }

  isAftereightam(): boolean {
    const now = dayjs();
    const today8am = now.hour(8).minute(0).second(0);
    return now.isAfter(today8am);
  }

  getOeeTimeRange(): { startdate: string; enddate: string } {
    const now = dayjs();
    const today8am = dayjs().hour(8).minute(0).second(0).millisecond(0);
    let startDate: dayjs.Dayjs;
    if (now.isBefore(today8am)) {
    
      startDate = today8am.subtract(1, 'day');
    } else {
      
      startDate = today8am;
    }

    const endDate = startDate.add(1, 'day');

    return {
      startdate: startDate.format('YYYY-MM-DD HH:mm:ss'),
      enddate: endDate.format('YYYY-MM-DD HH:mm:ss'),
    };
  }

  getYesterdayDate(){
    return dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  }

  getTodayDate(){
    return dayjs().format('YYYY-MM-DD');
  }


  getProductionDataDate(){
    const isAftereight = this.isAftereightam();
        let date = ''
        if (isAftereight){
            date = this.getTodayDate();
        }
        else{
            date = this.getYesterdayDate();
        }

    return date
  }
}