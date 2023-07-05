import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CalendarEvent } from './entities/calendar-event.entity';
import { CalendarEventsController } from './calendar-events.controller';
import { CalendarEventsService } from './calender-events.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CalendarSettingsModule } from 'src/calendar-settings/calendar-settings.module';

@Module({
    imports: [TypeOrmModule.forFeature([CalendarEvent]), UsersModule, CalendarSettingsModule],
    controllers: [CalendarEventsController],
    providers: [IsExist, IsNotExist, CalendarEventsService],
    exports: [CalendarEventsService],
})
export class CalendarEventModule { }
