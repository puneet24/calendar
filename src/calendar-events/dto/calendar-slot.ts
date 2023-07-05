import { CalendarEventTypeEnum } from "src/calendar-event-types/calendar-event-type.enum";
import { Slot } from "./slot";

export class CalendarSlot extends Slot {
    meetingType: String;
    eventId: number;
    eventName: String;

    constructor(startTime: Date, endTime: Date, meetingType: String, eventId: number, eventName: String) {
        super(startTime, endTime);
        this.meetingType = meetingType;
        this.eventId = eventId
        this.eventName = eventName
    }
}