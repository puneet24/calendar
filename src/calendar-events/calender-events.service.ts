import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { And, ArrayContains, Between, DeepPartial, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { CalendarEvent } from './entities/calendar-event.entity';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UsersService } from 'src/users/users.service';
import { Slot } from './dto/slot';
import { CalendarEventType } from 'src/calendar-event-types/entities/calendar-event-type.entity';
import { CalendarEventTypeEnum } from 'src/calendar-event-types/calendar-event-type.enum';
import { findSlotsFromRrule, getDuration } from 'src/utils/recurring-events-helper';
import { CalendarSlot } from './dto/calendar-slot';
import { CalendarSettingsService } from 'src/calendar-settings/calendar-settings.service';
import { getBusySlotsTimeInterval, getFreeSlots, getFreeSlotsFromCalendar, getIntersectionOfSlots, getUnionSlots, updateTime } from 'src/utils/calendar-helper';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CalendarEventsService {
    constructor(
        @InjectRepository(CalendarEvent)
        private calendarEventRepository: Repository<CalendarEvent>,
        private userService: UsersService,
        private calendarSettingsService: CalendarSettingsService
    ) { }

    async create(createCalendarEventDto: CreateCalendarEventDto, user: User): Promise<CalendarEvent> {
        let calendarEvent: CalendarEvent = new CalendarEvent;
        if (createCalendarEventDto.guestList && createCalendarEventDto.guestList.length > 0) {
            calendarEvent.users = await this.userService.findByIds(createCalendarEventDto.guestList);
        }
        calendarEvent.description = createCalendarEventDto.description
        calendarEvent.name = createCalendarEventDto.name;
        calendarEvent.rrule = createCalendarEventDto.rrule;
        calendarEvent.type = createCalendarEventDto.type;
        calendarEvent.startDate = new Date(createCalendarEventDto.startDate)
        calendarEvent.endDate = new Date(createCalendarEventDto.endDate)
        calendarEvent.primaryHost = user;
        return this.calendarEventRepository.save(
            this.calendarEventRepository.create(calendarEvent),
        );
    }

    async findBlockedMeetingSlots(userId: number, fromDate: Date, toDate: Date): Promise<CalendarSlot[]> {
        const events = await this.findEvents(userId, fromDate, toDate);
        const allSlots = events.reduce((prev: CalendarSlot[], currentEvent: CalendarEvent) => {
            let calendarslots: CalendarSlot[] = [];
            switch (currentEvent.type.id) {
                case CalendarEventTypeEnum.recurring:
                    const slots = findSlotsFromRrule(currentEvent.rrule, fromDate, toDate, getDuration(currentEvent.startDate, currentEvent.endDate));
                    calendarslots = slots.map(slot => {
                        return new CalendarSlot(slot.startTime, slot.endTime, currentEvent.type.name, currentEvent.id, currentEvent.name)
                    })
                    break;
                default:
                    calendarslots.push(new CalendarSlot(currentEvent.startDate, currentEvent.endDate, currentEvent.type.name, currentEvent.id, currentEvent.name));
                    break;
            }
            return [...prev, ...calendarslots];
        }, []);
        return allSlots.sort((a: Slot, b: Slot) => a.startTime.getTime() - b.startTime.getTime());
    }

    async findEvents(userId: number, fromDate: Date, toDate: Date) {
        return this.calendarEventRepository.find({
            where: {
                users: {
                    id: userId
                },
                startDate: Between(fromDate, toDate),
            }
        });
    }

    async findBusySlots(userId: number, fromDate: Date, toDate: Date): Promise<Slot[]> {
        const user = await this.userService.findOne({ id: userId });
        const blockedMeetingSlots = await this.findBlockedMeetingSlots(userId, fromDate, toDate);
        const blockedTimeIntervals = getBusySlotsTimeInterval(blockedMeetingSlots);
        return blockedTimeIntervals;
    }

    async findFreeSlots(userId: number, fromDate: Date, toDate: Date) {
        const allBlockedIntervals = await this.findBusySlots(userId, fromDate, toDate);
        let freeSlots: Slot[] = [];
        const user = await this.userService.findOne({ id: userId });
        let calendarAvailableSlots: Slot[] = [];
        if (user?.calendarSetting) {
            calendarAvailableSlots = await this.calendarSettingsService.findCalendarAvailableSlots(user.calendarSetting.id, fromDate, toDate);
            console.log('calendarAvailableSlots', calendarAvailableSlots);
        }
        return getFreeSlotsFromCalendar(calendarAvailableSlots, allBlockedIntervals);
    }

    async findFreeSlotsForUsers(userIds: number[], fromDate: Date, toDate: Date) {
        let promises: Promise<Slot[]>[] = [];
        userIds.forEach((currentUser: number) => {
            promises.push(this.findFreeSlots(currentUser, fromDate, toDate));
        });
        const freeUsersSlots = await Promise.all(promises)
        return freeUsersSlots.reduce((prev: Slot[], freeUserSlots: Slot[]) => {
            return getIntersectionOfSlots(prev, freeUserSlots);
        }, [] as Slot[]);
    }

    async findOne(id: number, user: User): Promise<NullableType<CalendarEvent>> {
        return this.calendarEventRepository.findOne({ where: { id: id, users: ArrayContains([user]) } })
    }

    async update(id: number, updateCalendarEventDto: CreateCalendarEventDto, user: User): Promise<NullableType<CalendarEvent>> {
        let calendarEvent = await this.calendarEventRepository.findOne({ where: { id: id } })
        if (calendarEvent) {
            if (updateCalendarEventDto.guestList && updateCalendarEventDto.guestList.length > 0) {
                calendarEvent.users = await this.userService.findByIds(updateCalendarEventDto.guestList);
            }
            calendarEvent.description = updateCalendarEventDto.description
            calendarEvent.name = updateCalendarEventDto.name;
            calendarEvent.rrule = updateCalendarEventDto.rrule;
            calendarEvent.type = updateCalendarEventDto.type;
            calendarEvent.startDate = new Date(updateCalendarEventDto.startDate)
            calendarEvent.endDate = new Date(updateCalendarEventDto.endDate)
            calendarEvent.primaryHost = user;
            return this.calendarEventRepository.save(calendarEvent)
        }
        return null
    }

    async softDelete(id: number, user: User): Promise<void> {
        await this.calendarEventRepository.softDelete({ id: id, users: ArrayContains([user]) });
    }
}
