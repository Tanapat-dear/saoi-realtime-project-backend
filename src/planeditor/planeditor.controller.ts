import { Controller, Get , Post , Body, UseGuards } from '@nestjs/common';
import { PlaneditorService } from './planeditor.service';
import { DayjsserviceService } from 'src/dayjsservice/dayjsservice.service';
import { CreatePlanEditorDto } from './dto/create-planeditor.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/rbac/roles.enum';
import { Roles } from 'src/rbac/roles.decorator';
import { RolesGuard } from 'src/rbac/roles.guard';
@Controller('api/planeditor')
export class PlaneditorController {

    constructor(private readonly planeditorservice: PlaneditorService, private readonly dayjsservice: DayjsserviceService){}

    @Get()
    async findAll():Promise<unknown> {
        return {
            status: 'OK',
            data: await this.planeditorservice.getPlanData(),
            timestamp: this.dayjsservice.now(),
        }
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin,Role.User)
    @Post()
    async updatePlan(@Body() createplaneditordto: CreatePlanEditorDto) {
        return {
            status:'OK',
            data: await this.planeditorservice.upDatePlanData(createplaneditordto)
        };
    }
}
