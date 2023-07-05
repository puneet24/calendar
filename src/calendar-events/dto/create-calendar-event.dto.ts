import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional
} from 'class-validator';
import { CalendarEventType } from 'src/calendar-event-types/entities/calendar-event-type.entity';

export class CreateCalendarEventDto {
  @ApiProperty({ example: 'Stand Up' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'basic' })
  @IsNotEmpty()
  type: CalendarEventType;

  @ApiProperty({ example: 'rrule' })
  @IsOptional()
  rrule: string;

  @ApiProperty({ example: 'date' })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: 'date' })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ example: 'Daily Stand up' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  guestList?: number[];
}
