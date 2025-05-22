import type { AnyTaskDTO } from "~/lib/types/task";

// 5. Strategy

export class TaskSortingStrategy {
    static sortByDate(tasks: AnyTaskDTO[]): AnyTaskDTO[] {
        return [...tasks].sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;

            return (
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
        });
    }

    static sortByName(tasks: AnyTaskDTO[]): AnyTaskDTO[] {
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    }

    static sortById(tasks: AnyTaskDTO[]): AnyTaskDTO[] {
        return [...tasks].sort((a, b) => a.id.localeCompare(b.id));
    }
}
