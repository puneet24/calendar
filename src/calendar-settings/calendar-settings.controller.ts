import {
    Controller,
    Get,
    Post,
    Body,
    Request,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    HttpStatus,
    HttpCode,
    SerializeOptions,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
import { CalendarSetting } from './entities/calendar-setting.entity';
import { CalendarSettingsService } from './calendar-settings.service';
import { CreateUpdateCalendarSettingDto } from './dto/create-update-calendar-setting.dto';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('CalendarSettings')
@Controller({
    path: 'calendar-setting',
    version: '1',
})
export class CalendarSettingsController {
    constructor(private readonly calendarSettingsService: CalendarSettingsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createCalendarSettingDto: CreateUpdateCalendarSettingDto, @Request() request): Promise<CalendarSetting> {
        return this.calendarSettingsService.create(createCalendarSettingDto, request.user);
    }

    @SerializeOptions({
        groups: ['me', 'admin'],
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    findOne(@Request() request): Promise<NullableType<CalendarSetting>> {
        return this.calendarSettingsService.findOne({ id: request.user.calendarSetting?.id });
    }

    @SerializeOptions({
        groups: ['me', 'admin'],
    })
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Request() request,
        @Body() updateCalendarSettingDto: CreateUpdateCalendarSettingDto,
    ): Promise<CalendarSetting> {
        return this.calendarSettingsService.update(request.user.calendarSetting?.id, updateCalendarSettingDto);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Request() request): Promise<void> {
        return this.calendarSettingsService.softDelete(request.user.calendarSetting?.id);
    }
}
