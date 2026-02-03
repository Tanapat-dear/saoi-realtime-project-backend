import { IsString, IsNumber } from "class-validator";


export class CreateWeblayoutDto {

    @IsNumber()
    row: number


    
}
