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

@Entity()
export class CalendarEvent extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String })
    name: String;

    @Index()
    @Column({ type: Date })
    startDate: Date;

    @Index()
    @Column({ type: Date })
    endDate: Date;

    @OneToOne(() => User)
    @JoinColumn()
    primaryHost: User;

    @ManyToOne(() => CalendarEventType, {
        eager: true,
    })
    type: CalendarEventType;

    @Column({ type: String })
    rrule?: String;

    @ManyToMany(() => User, (user) => user.calendarEvents, { eager: false })
    @JoinTable({ name: "users_calendar_events" })
    users: User[]

    @Column({ type: String })
    description: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
