import { format, isToday, isTomorrow, isYesterday, isPast } from "date-fns";

export function formatDate(dateInput: Date | string | number): string {
    const date = new Date(dateInput);
    if (isToday(date)) {
        return `Today, ${format(date, "p")}`;
    }
    if (isTomorrow(date)) {
        return `Tomorrow, ${format(date, "p")}`;
    }
    if (isYesterday(date)) {
        return `Yesterday, ${format(date, "p")}`;
    }

    return format(date, "MMM d, yyyy, p");
}

export function isOverdue(dueDate: Date | string | number): boolean {
    const date = new Date(dueDate);
    return isPast(date) && !isToday(date);
}

export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
        return `${hours} hr${hours > 1 ? "s" : ""}`;
    }
    return `${hours} hr${hours > 1 ? "s" : ""} ${remainingMinutes} min`;
}
