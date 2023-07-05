import { Slot } from "src/calendar-events/dto/slot";

export const updateTime = (actualDate: Date, updatedTime: Date): Date => {
    let resultDate = new Date(actualDate);
    resultDate.setHours(updatedTime.getHours(), updatedTime.getMinutes(), updatedTime.getSeconds(), updatedTime.getMilliseconds());
    return resultDate
}

export const getUnionSlots = (slots1: Slot[], slots2: Slot[]) => {
    let allSlots: Slot[] = [];
    let slots1Index = 0;
    let slots2Index = 0;
    while (slots1Index < slots1.length || slots2Index < slots2.length) {
        if (slots1Index >= slots1.length) {
            allSlots.push(slots2[slots2Index]);
            slots2Index += 1;
            continue;
        }
        if (slots2Index >= slots2.length) {
            allSlots.push(slots1[slots1Index]);
            slots1Index += 1;
            continue;
        }
        if (slots1[slots1Index].startTime.getTime() <= slots2[slots2Index].startTime.getTime()) {
            allSlots.push(slots1[slots1Index]);
            slots1Index += 1;
        } else {
            allSlots.push(slots2[slots2Index]);
            slots2Index += 1;
        }
    }
    return getBusySlotsTimeInterval(allSlots)
    // allSlots = allSlots.reduce((prev: Slot[], currentSlot: Slot, currentIndex: number, slots: Slot[]) => {
    //     if (currentIndex === slots.length - 1 || slots[currentIndex + 1].startTime > currentSlot.endTime) {
    //         return [...prev, currentSlot]
    //     } else {
    //         slots[currentIndex + 1].startTime = currentSlot.startTime;
    //         if (currentSlot.endTime > slots[currentIndex + 1].endTime) {
    //             slots[currentIndex + 1].endTime = currentSlot.endTime
    //         }
    //         return prev;
    //     }

    // }, [] as Slot[]);
    // return allSlots;
}

export const getFreeSlots = (busySlots: Slot[], fromDate: Date, toDate: Date) => {
    let freeSlots: Slot[] = [];
    busySlots.forEach((value, index, slots) => {
        if (index === 0 && fromDate < value.startTime) {
            freeSlots.push(new Slot(fromDate, value.startTime));
        }
        if (index !== 0 && value.startTime > slots[index - 1].endTime) {
            freeSlots.push(new Slot(slots[index - 1].endTime, value.startTime));
        }

        if (index === slots.length - 1 && value.endTime < toDate) {
            freeSlots.push(new Slot(value.endTime, toDate));
        }
    });
    return freeSlots;
}

export const getBusySlotsTimeInterval = (busyMeetingSlots: Slot[]) => {
    return busyMeetingSlots.reduce((prev: Slot[], blockedMeetingSlot: Slot) => {
        let lastBlockedTime = prev.length === 0 ? null : prev[prev.length - 1].endTime;
        if (!lastBlockedTime || lastBlockedTime < blockedMeetingSlot.startTime) {
            return [...prev, blockedMeetingSlot];
        } else if (lastBlockedTime <= blockedMeetingSlot.endTime) {
            return [...prev, new Slot(lastBlockedTime, blockedMeetingSlot.endTime)];
        } else {
            return prev;
        }
    }, [] as Slot[]);
}

export const getFreeSlotsFromCalendar = (availableSlots: Slot[], busySlots: Slot[]) => {
    if (availableSlots.length === 0) {
        return [];
    }
    let busySlotIndex = 0;
    let availableSlotIndex = 0;
    let freeSlots: Slot[] = [];
    while (availableSlotIndex < availableSlots.length) {
        const availableSlot = availableSlots[availableSlotIndex];
        let busySlot = busySlotIndex < busySlots.length ? busySlots[busySlotIndex] : null;
        if (!busySlot) {
            freeSlots.push(availableSlot);
            availableSlotIndex += 1;
        } else {
            if (busySlot.endTime <= availableSlot.startTime) {
                busySlotIndex += 1;
            } else if (busySlot.endTime <= availableSlot.endTime) {
                if (busySlot.startTime > availableSlot.startTime) {
                    freeSlots.push(new Slot(availableSlot.startTime, busySlot.startTime));
                }
                if (busySlot.endTime === availableSlot.endTime) {
                    busySlotIndex += 1;
                    availableSlotIndex += 1;
                } else {
                    availableSlots[availableSlotIndex].startTime = busySlot.endTime;
                    busySlotIndex += 1;
                }
            } else {
                if (busySlot.startTime > availableSlot.startTime) {
                    freeSlots.push(new Slot(availableSlot.startTime, busySlot.startTime < availableSlot.endTime ? busySlot.startTime : availableSlot.endTime));
                }
                availableSlotIndex += 1;
            }
        }
    }
    return freeSlots;
}

export const getIntersectionOfSlots = (slots1: Slot[], slots2: Slot[]) => {
    if (slots1.length == 0 || slots2.length === 0) {
        return [] as Slot[]
    }
    let intersectionSlots: Slot[] = [];
    let slot1Index = 0;
    let slot2Index = 0;
    while (slot1Index < slots1.length && slot2Index < slots2.length) {
        let intersectionStartTime = slots2[slot2Index].startTime > slots1[slot1Index].startTime ? slots2[slot2Index].startTime : slots1[slot1Index].startTime;
        let intersectionEndTime = slots2[slot2Index].endTime < slots1[slot1Index].endTime ? slots2[slot2Index].endTime : slots1[slot1Index].endTime;
        if (intersectionStartTime < intersectionEndTime) {
            intersectionSlots.push(new Slot(intersectionStartTime, intersectionEndTime));
        }
        if (slots1[slot1Index].endTime < slots2[slot2Index].endTime) {
            slot1Index += 1;
        } else {
            slot2Index += 1;
        }
    }
    return intersectionSlots;
}