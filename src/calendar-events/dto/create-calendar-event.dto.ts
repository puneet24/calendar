import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
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
