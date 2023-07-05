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
import { CalendarEventsService } from './calender-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { CalendarEvent } from './entities/calendar-event.entity';
import { FreeSlotForUsers } from './dto/free-slot-for-users';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('CalendarEvents')
@Controller({
    path: 'events',
    version: '1',
})
export class CalendarEventsController {
    constructor(private readonly calendarEventsService: CalendarEventsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createCalendarEventDto: CreateCalendarEventDto, @Request() user): Promise<CalendarEvent> {
        return this.calendarEventsService.create(createCalendarEventDto, user);
    }

    @SerializeOptions({
        groups: ['me', 'admin'],
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    public findAll(@Query('fromDate') fromDate: Date,
        @Query('toDate') toDate: Date, @Request() request): Promise<any> {
        return this.calendarEventsService.findBlockedMeetingSlots(request.user.id, fromDate, toDate);
    }

    @SerializeOptions({
        groups: ['me', 'admin'],
    })
    @Get('freeSlots')
    @HttpCode(HttpStatus.OK)
    public findFreeSlots(@Query('fromDate') fromDate: Date,
        @Query('toDate') toDate: Date, @Request() request): Promise<any> {
        return this.calendarEventsService.findFreeSlots(request.user.id, fromDate, toDate);
    }

    @SerializeOptions({
        groups: ['me', 'admin'],
    })
    @Post('freeSlotsForUsers')
    @HttpCode(HttpStatus.OK)
    public findFreeSlotsForUsers(@Body() freeSlotForUsers: FreeSlotForUsers, @Request() request): Promise<any> {
        return this.calendarEventsService.findFreeSlotsForUsers(freeSlotForUsers.users, freeSlotForUsers.fromDate, freeSlotForUsers.toDate);
    }

    @SerializeOptions({
        groups: ['admin'],
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string, @Request() request): Promise<NullableType<CalendarEvent>> {
        return this.calendarEventsService.findOne(parseInt(id), request.user);
    }

    // @SerializeOptions({
    //   groups: ['admin'],
    // })
    // @Patch(':id')
    // @HttpCode(HttpStatus.OK)
    // update(
    //   @Param('id') id: number,
    //   @Body() updateProfileDto: UpdateUserDto,
    // ): Promise<User> {
    //   return this.usersService.update(id, updateProfileDto);
    // }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number, @Request() request): Promise<void> {
        return this.calendarEventsService.softDelete(id, request.user);
    }
}
