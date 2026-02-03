import { IsString , MinLength } from "class-validator";

export class SignInDTO{

    @IsString()
    @MinLength(1)
    username: string


    @IsString()
    @MinLength(1)
    password: string
}