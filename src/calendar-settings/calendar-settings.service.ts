import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from 'src/calendar-events/dto/slot';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { findSlotsFromRrule } from 'src/utils/recurring-events-helper';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial, Repository } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { CreateUpdateCalendarSettingDto } from './dto/create-update-calendar-setting.dto';
import { CalendarSetting } from './entities/calendar-setting.entity';

@Injectable()
export class CalendarSettingsService {
    constructor(
        @InjectRepository(CalendarSetting)
        private calendarSettingRepository: Repository<CalendarSetting>,
        private userService: UsersService
    ) { }

    async create(createCalendarSettingDto: CreateUpdateCalendarSettingDto, user: User): Promise<CalendarSetting> {
        let calendarSetting = new CalendarSetting();
        calendarSetting.timeZone = createCalendarSettingDto.timeZone;
        calendarSetting.user = user;
        calendarSetting = await this.calendarSettingRepository.save(
            this.calendarSettingRepository.create(calendarSetting)
        );
        await this.userService.update(user.id, { calendarSetting: calendarSetting })
        return calendarSetting;
    }

    async findOne(fields: EntityCondition<CalendarSetting>): Promise<NullableType<CalendarSetting>> {
        return this.calendarSettingRepository.findOne({
            where: fields
        })
    }

    async update(id: number, payload: DeepPartial<CalendarSetting>): Promise<CalendarSetting> {
        return this.calendarSettingRepository.save(
            this.calendarSettingRepository.create({
                id,
                ...payload,
            }),
        );
    }

    async softDelete(id: number): Promise<void> {
        await this.calendarSettingRepository.softDelete(id);
    }

    async findCalendarAvailableSlots(id: number, fromDate: Date, toDate: Date): Promise<Slot[]> {
        const calendarSetting = await this.findOne({ id: id });
        if (calendarSetting) {
            const allSlots = calendarSetting.calendarAvailibilities.reduce((prev, calendarAvailibility) => {
                const availableSlots = findSlotsFromRrule(calendarAvailibility.availableRrule, fromDate, toDate, calendarAvailibility.duration as number);
                return [...prev, ...availableSlots];
            }, [] as Slot[]);
            return allSlots.sort((a: Slot, b: Slot) => a.startTime.getTime() - b.startTime.getTime());
        }
        return [] as Slot[];
    }

    // async findCalendarSettingOofRruleSlots(id: number, fromDate: Date, toDate: Date): Promise<Slot[]> {
    //     const calendarSetting = await this.findOne({ id: id });
    //     if (calendarSetting) {
    //         return findSlotsFromRrule(calendarSetting?.oofRrule, fromDate, toDate, calendarSetting.duration as number);
    //     }
    //     return [] as Slot[];

    // }
}
