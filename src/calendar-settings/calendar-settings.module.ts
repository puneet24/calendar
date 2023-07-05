import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CalendarSetting } from './entities/calendar-setting.entity';
import { CalendarSettingsController } from './calendar-settings.controller';
import { CalendarSettingsService } from './calendar-settings.service';

@Module({
    imports: [TypeOrmModule.forFeature([CalendarSetting]), UsersModule],
    controllers: [CalendarSettingsController],
    providers: [IsExist, IsNotExist, CalendarSettingsService],
    exports: [CalendarSettingsService],
})
export class CalendarSettingsModule { }
