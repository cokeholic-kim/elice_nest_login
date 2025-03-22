import {  IsNotEmpty,  IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class VertifyEmailDto {
    @IsString()
    @ApiProperty({ example: '12345@gmail.com' })
    email:string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '000000' })
    code:string;
}