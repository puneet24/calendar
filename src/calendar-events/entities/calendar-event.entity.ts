import { CalendarEventType } from 'src/calendar-event-types/entities/calendar-event-type.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

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
