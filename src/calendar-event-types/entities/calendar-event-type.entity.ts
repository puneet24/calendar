import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CalendarEventType extends EntityHelper {
    @ApiProperty({ example: 1 })
    @PrimaryColumn()
    id: number;

    @Allow()
    @ApiProperty({ example: 'Reminder' })
    @Column()
    name: string;
}
