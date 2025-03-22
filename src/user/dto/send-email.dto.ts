import {  IsNotEmpty,  IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SendEmailDto {
    @IsString()
    @ApiProperty({ example: '12345@gmail.com' })
    email:string;
}