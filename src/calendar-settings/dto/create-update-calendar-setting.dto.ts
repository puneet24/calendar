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

export class CreateUpdateCalendarSettingDto {
    @ApiProperty({ example: 'IST' })
    @IsNotEmpty()
    timeZone: String;
}
