import { IsInt, Min } from "class-validator";
export class CreatePlanEditorDto {
    
    @IsInt()
    @Min(0)
    readonly mc_plan: number;

    @IsInt()
    @Min(0)
    readonly man_plan: number;

    @IsInt()
    @Min(0)
    readonly output_lot_plan: number;

    @IsInt()
    @Min(0)
    readonly output_sht_plan: number;

}
