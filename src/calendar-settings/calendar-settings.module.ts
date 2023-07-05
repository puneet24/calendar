import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CalendarSettingsController } from './calendar-settings.controller';
import { CalendarSettingsService } from './calendar-settings.service';
import { CalendarSetting } from './entities/calendar-setting.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CalendarSetting]), UsersModule],
    controllers: [CalendarSettingsController],
    providers: [IsExist, IsNotExist, CalendarSettingsService],
    exports: [CalendarSettingsService],
})
export class CalendarSettingsModule { }
