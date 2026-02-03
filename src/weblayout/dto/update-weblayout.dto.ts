import { PartialType } from '@nestjs/swagger';
import { CreateWeblayoutDto } from './create-weblayout.dto';

export class UpdateWeblayoutDto extends PartialType(CreateWeblayoutDto) {}
