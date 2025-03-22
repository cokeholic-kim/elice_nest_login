import {  IsNotEmpty,  IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {


    @IsString()
    @ApiProperty({ example: '12345@gmail.com' })
    email:string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1234556' })
    password:string;
}