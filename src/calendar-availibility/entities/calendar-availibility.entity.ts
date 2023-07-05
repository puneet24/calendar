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
import { CalendarSetting } from 'src/calendar-settings/entities/calendar-setting.entity';

@Entity()
export class CalendarAvailibility extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String })
    availableRrule: String

    @Column({ type: Number })
    duration: Number

    @ManyToOne(() => CalendarSetting, (calendarSetting) => calendarSetting.calendarAvailibilities)
    @JoinColumn()
    calendarSetting: CalendarSetting;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
