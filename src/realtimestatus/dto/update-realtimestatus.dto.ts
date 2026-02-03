import { PartialType } from '@nestjs/mapped-types';
import { CreateRealtimestatusDto } from './create-realtimestatus.dto';

export class UpdateRealtimestatusDto extends PartialType(CreateRealtimestatusDto) {}
