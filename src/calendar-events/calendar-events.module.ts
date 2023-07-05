import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarSettingsModule } from 'src/calendar-settings/calendar-settings.module';
import { UsersModule } from 'src/users/users.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CalendarEventsController } from './calendar-events.controller';
import { CalendarEventsService } from './calender-events.service';
import { CalendarEvent } from './entities/calendar-event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CalendarEvent]), UsersModule, CalendarSettingsModule],
    controllers: [CalendarEventsController],
    providers: [IsExist, IsNotExist, CalendarEventsService],
    exports: [CalendarEventsService],
})
export class CalendarEventModule { }
