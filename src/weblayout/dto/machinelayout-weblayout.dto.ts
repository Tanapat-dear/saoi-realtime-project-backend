import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


class MachineRowDTO {
  @IsNumber()
  @IsNotEmpty()
  row: number;

  @IsArray()
  machine: any[];

  @IsBoolean()
  has_walkpath_right: boolean;

  @IsString()
  @IsNotEmpty()
  manpower_layout: string;

  @IsString()
  @IsNotEmpty()
  area: string;
}



export class MachinelayoutDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MachineRowDTO) 
  data: MachineRowDTO[];
}