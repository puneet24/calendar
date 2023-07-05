import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEventTypeEnum } from 'src/calendar-event-types/calendar-event-type.enum';
import { CalendarEventType } from 'src/calendar-event-types/entities/calendar-event-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalendarEvenTypeSeedService {
    constructor(
        @InjectRepository(CalendarEventType)
        private repository: Repository<CalendarEventType>,
    ) { }

    async run() {
        const countCalendarEventTypes = await this.repository.count();

        if (!countCalendarEventTypes) {
            await this.repository.save(
                this.repository.create({
                    id: CalendarEventTypeEnum.basic,
                    name: 'basic',
                }),
            );
            await this.repository.save(
                this.repository.create({
                    id: CalendarEventTypeEnum.recurring,
                    name: 'recurring',
                }),
            );
            await this.repository.save(
                this.repository.create({
                    id: CalendarEventTypeEnum.reminder,
                    name: 'reminder',
                }),
            );
        }
    }
}
