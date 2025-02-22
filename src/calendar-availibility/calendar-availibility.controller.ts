import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Request,
    SerializeOptions,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { NullableType } from '../utils/types/nullable.type';
import { CalendarAvailibilityService } from './calendar-availibility.service';
import { CreateCalendarAvailibilityDto } from './dto/create-calendar-availibility.dto';
import { CalendarAvailibility } from './entities/calendar-availibility.entity';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('CalendarAvailibility')
@Controller({
    path: 'calendar-availibility',
    version: '1',
})
export class CalendarAvailibilityController {
    constructor(private readonly calendarAvailibilityService: CalendarAvailibilityService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createCalendarAvailibilityDto: CreateCalendarAvailibilityDto, @Request() request): Promise<NullableType<CalendarAvailibility>> {
        return this.calendarAvailibilityService.create(createCalendarAvailibilityDto, request.user);
    }

    @SerializeOptions({
        groups: ['me', 'admin'],
    })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param(':id') id, @Request() request): Promise<NullableType<CalendarAvailibility>> {
        return this.calendarAvailibilityService.findOne({ id: id });
    }

    @SerializeOptions({
        groups: ['me', 'admin'],
    })
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: number,
        @Request() request,
        @Body() updateCalendarAvailibilityDto: CreateCalendarAvailibilityDto,
    ): Promise<CalendarAvailibility> {
        return this.calendarAvailibilityService.update(id, updateCalendarAvailibilityDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param(':id') id: number, @Request() request): Promise<void> {
        return this.calendarAvailibilityService.softDelete(id);
    }
}
