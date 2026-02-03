import { Injectable , Inject } from '@nestjs/common';
import { UtilsDataGetter } from 'src/utils/datagetter_utill';
import { CreatePlanEditorDto } from './dto/create-planeditor.dto';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
@Injectable()
export class PlaneditorService {
    constructor(private dayjsservice: DayjsserviceService,private utilgetter: UtilsDataGetter) {}

      async getPlanData(): Promise<unknown>{
        return this.utilgetter.getActualPlanData();
    }
    
      async upDatePlanData(createplaneditordto: CreatePlanEditorDto): Promise<unknown> {
          
            const [historyResult, actvResult] = await Promise.all([
                this.utilgetter.updatePlanDataReal(createplaneditordto),
                this.utilgetter.updatePlanDataActv(createplaneditordto)
            ]);
            return {
                update_history: 'Insert history Data OK!',
                update_actv: 'Insert actv Data OK!',
                data: createplaneditordto,
                timestamp: this.dayjsservice.now(),
            };
        }
}
