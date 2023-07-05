import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { And, Between, DeepPartial, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { findSlotsFromRrule } from 'src/utils/recurring-events-helper';
import { Slot } from 'src/calendar-events/dto/slot';
import { CalendarAvailibility } from './entities/calendar-availibility.entity';
import { CreateCalendarAvailibilityDto } from './dto/create-calendar-availibility.dto';

@Injectable()
export class CalendarAvailibilityService {
    constructor(
        @InjectRepository(CalendarAvailibility)
        private calendarAvailibilityRepository: Repository<CalendarAvailibility>,
        private userService: UsersService
    ) { }

    async create(createCalendarAvailibilityDto: CreateCalendarAvailibilityDto, user: User): Promise<NullableType<CalendarAvailibility>> {
        const userObj = await this.userService.findOne({ id: user.id })
        if (userObj?.calendarSetting) {
            let calendarAvailibility = new CalendarAvailibility();
            calendarAvailibility.availableRrule = createCalendarAvailibilityDto.availableRrule;
            calendarAvailibility.duration = createCalendarAvailibilityDto.duration;
            calendarAvailibility.calendarSetting = userObj.calendarSetting;
            return this.calendarAvailibilityRepository.save(
                this.calendarAvailibilityRepository.create(calendarAvailibility)
            );
        }
        return null;
    }

    async findOne(fields: EntityCondition<CalendarAvailibility>): Promise<NullableType<CalendarAvailibility>> {
        return this.calendarAvailibilityRepository.findOne({
            where: fields
        })
    }

    async update(id: number, payload: DeepPartial<CalendarAvailibility>): Promise<CalendarAvailibility> {
        return this.calendarAvailibilityRepository.save(
            this.calendarAvailibilityRepository.create({
                id,
                ...payload,
            }),
        );
    }

    async softDelete(id: number): Promise<void> {
        await this.calendarAvailibilityRepository.softDelete(id);
    }

    // async findCalendarSettingOofRruleSlots(id: number, fromDate: Date, toDate: Date): Promise<Slot[]> {
    //     const calendarSetting = await this.findOne({ id: id });
    //     if (calendarSetting) {
    //         return findSlotsFromRrule(calendarSetting?.oofRrule, fromDate, toDate, calendarSetting.duration as number);
    //     }
    //     return [] as Slot[];

    // }
}
