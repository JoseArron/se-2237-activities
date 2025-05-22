export type TaskType = "basic" | "timed" | "checklist";

export type AnyTaskDTO = BasicTaskDTO | TimedTaskDTO | ChecklistTaskDTO;
export interface TaskDTO {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    isCompleted: boolean;
    taskType: TaskType;
}

export interface BasicTaskDTO extends TaskDTO {
    taskType: "basic";
}

export interface TimedTaskDTO extends TaskDTO {
    taskType: "timed";
    duration: number;
    timeRemaining: number;
}

export interface ChecklistItem {
    id: string;
    text: string;
    isCompleted: boolean;
}

export interface ChecklistTaskDTO extends TaskDTO {
    taskType: "checklist";
    items: ChecklistItem[];
}

// returned by "api"
export interface TaskEntity {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    isCompleted: boolean;
    taskType: TaskType;
    duration?: number;
    items?: ChecklistItem[];
}
