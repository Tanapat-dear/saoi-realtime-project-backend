import { PartialType } from '@nestjs/swagger';
import { CreateOutputproductionDto } from './create-outputproduction.dto';

export class UpdateOutputproductionDto extends PartialType(CreateOutputproductionDto) {}
