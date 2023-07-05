import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CalendarAvailibility } from './entities/calendar-availibility.entity';
import { CalendarAvailibilityController } from './calendar-availibility.controller';
import { CalendarAvailibilityService } from './calendar-availibility.service';

@Module({
    imports: [TypeOrmModule.forFeature([CalendarAvailibility]), UsersModule],
    controllers: [CalendarAvailibilityController],
    providers: [IsExist, IsNotExist, CalendarAvailibilityService],
    exports: [CalendarAvailibilityService],
})
export class CalendarAvailibilityModule { }
