import { CalendarEventTypeEnum } from "src/calendar-event-types/calendar-event-type.enum";

export class Slot {

    startTime: Date;
    endTime: Date;

    constructor(startTime: Date, endTime: Date) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}