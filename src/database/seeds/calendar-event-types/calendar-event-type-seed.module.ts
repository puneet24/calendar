import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEventType } from 'src/calendar-event-types/entities/calendar-event-type.entity';
import { CalendarEvenTypeSeedService } from './calendar-event-type-seed.service';

@Module({
    imports: [TypeOrmModule.forFeature([CalendarEventType])],
    providers: [CalendarEvenTypeSeedService],
    exports: [CalendarEvenTypeSeedService],
})
export class CalendarEventTypeSeedModule { }
