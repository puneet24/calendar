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

export class CreateCalendarAvailibilityDto {
    @ApiProperty({ example: 'availibility rule' })
    @IsNotEmpty()
    availableRrule: String;

    @ApiProperty({ example: '30' })
    @IsNotEmpty()
    duration: Number;
}
