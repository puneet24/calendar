import { CalendarAvailibility } from 'src/calendar-availibility/entities/calendar-availibility.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class CalendarSetting extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.calendarSetting, { cascade: true })
    @JoinColumn()
    user: User;

    @Column({ type: String })
    timeZone: String;


    @OneToMany(() => CalendarAvailibility, (calendarAvailibility) => calendarAvailibility.calendarSetting, { eager: true })
    calendarAvailibilities: CalendarAvailibility[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
