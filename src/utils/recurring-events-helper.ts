import { RRule } from "rrule"
import { CalendarEventTypeEnum } from "src/calendar-event-types/calendar-event-type.enum"
import { Slot } from "src/calendar-events/dto/slot";
import { CalendarEvent } from "src/calendar-events/entities/calendar-event.entity"

export const findSlotsFromRrule = (rrule: String | undefined, fromDate: Date, toDate: Date, meetingDuration: number) => {
    if (rrule) {
        const rule = RRule.fromString(rrule as string);
        const validOccurences = rule.between(fromDate, toDate, true);
        return validOccurences.map(occurence => {
            const occurenceEndTime = new Date(occurence.getTime() + meetingDuration * 60000)
            return new Slot(occurence, occurenceEndTime)
        })
    }
    return [];

}

export const getDuration = (fromDate: Date, toDate: Date) => {
    var differenceValue = (toDate.getTime() - fromDate.getTime()) / 1000;
    differenceValue /= 60;
    return Math.abs(Math.round(differenceValue));
}