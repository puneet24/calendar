import {
    Column,
    AfterLoad,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToMany,
    OneToOne,
    OneToMany,
    JoinTable,
    JoinColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';
import { CalendarEventType } from 'src/calendar-event-types/entities/calendar-event-type.entity';
import { User } from 'src/users/entities/user.entity';
import { CalendarAvailibility } from 'src/calendar-availibility/entities/calendar-availibility.entity';

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
