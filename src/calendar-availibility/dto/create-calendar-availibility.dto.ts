import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty
} from 'class-validator';

export class CreateCalendarAvailibilityDto {
    @ApiProperty({ example: 'RRULE for setting availibility  for everyday from 9:00AM IST, eg: DTSTART:20230705T165200Z\nRRULE:FREQ=DAILY;UNTIL=20231130T165200Z;INTERVAL=1;WKST=MO;BYHOUR=3;BYMINUTE=30;BYSECOND=0' })
    @IsNotEmpty()
    availableRrule: String;

    @ApiProperty({ example: 'In minutes, eg: 30' })
    @IsNotEmpty()
    duration: Number;
}
