import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CalendarAvailibilityController } from './calendar-availibility.controller';
import { CalendarAvailibilityService } from './calendar-availibility.service';
import { CalendarAvailibility } from './entities/calendar-availibility.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CalendarAvailibility]), UsersModule],
    controllers: [CalendarAvailibilityController],
    providers: [IsExist, IsNotExist, CalendarAvailibilityService],
    exports: [CalendarAvailibilityService],
})
export class CalendarAvailibilityModule { }
