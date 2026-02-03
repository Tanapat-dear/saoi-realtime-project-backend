import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WeblayoutService } from './weblayout.service';
import { CreateWeblayoutDto } from './dto/create-weblayout.dto';
import { UpdateWeblayoutDto } from './dto/update-weblayout.dto';
import { MachinelayoutDTO } from './dto/machinelayout-weblayout.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/rbac/roles.guard';
import { Roles } from 'src/rbac/roles.decorator';
import { Role } from 'src/rbac/roles.enum';

@Controller('api/weblayout')
export class WeblayoutController {
  constructor(private readonly weblayoutService: WeblayoutService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin,Role.User)
  @Post('machine')
  create(@Body() machinelayoutdto: MachinelayoutDTO) {
    return this.weblayoutService.update(machinelayoutdto);
  }

  @Get()
  findAll() {
    return this.weblayoutService.findAll();
  }


}
