import type { AnyTaskDTO, TaskEntity } from "~/lib/types/task";

// 3. Adapter

export class TaskAdapter {
    // used to convert to the "view"
    static toDTO(entity: TaskEntity): AnyTaskDTO {
        const baseTask = {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            dueDate: entity.dueDate ? new Date(entity.dueDate) : undefined,
            isCompleted: entity.isCompleted,
            taskType: entity.taskType,
        };

        switch (entity.taskType) {
            case "timed":
                return {
                    ...baseTask,
                    taskType: "timed",
                    duration: entity.duration || 0,
                    timeRemaining: entity.duration || 0,
                };
            case "checklist":
                return {
                    ...baseTask,
                    taskType: "checklist",
                    items: entity.items || [],
                };
            default:
                return {
                    ...baseTask,
                    taskType: "basic",
                };
        }
    }

    // used in task manager
    static toEntity(dto: AnyTaskDTO): TaskEntity {
        const baseEntity = {
            id: dto.id,
            title: dto.title,
            description: dto.description,
            dueDate: dto.dueDate ? dto.dueDate.toISOString() : undefined,
            isCompleted: dto.isCompleted,
            taskType: dto.taskType,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        if (dto.taskType === "timed" && dto.duration !== undefined) {
            return {
                ...baseEntity,
                duration: dto.duration,
            };
        }

        if (dto.taskType === "checklist" && dto.items !== undefined) {
            return {
                ...baseEntity,
                items: dto.items,
            };
        }

        return {
            ...baseEntity,
        };
    }
}
