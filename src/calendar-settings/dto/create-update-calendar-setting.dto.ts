import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty
} from 'class-validator';

export class CreateUpdateCalendarSettingDto {
    @ApiProperty({ example: 'IST' })
    @IsNotEmpty()
    timeZone: String;
}
