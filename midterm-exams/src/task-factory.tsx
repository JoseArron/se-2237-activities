"use client";

import { BasicTask } from "~/components/tasks/basic-task";
import { TimedTask } from "~/components/tasks/timed-task";
import { ChecklistTask } from "~/components/tasks/checklist-task";
import type {
    AnyTaskDTO,
    BasicTaskDTO,
    ChecklistTaskDTO,
    TaskType,
    TimedTaskDTO,
} from "~/lib/types/task";

// 1. Factory Method

interface TaskFactoryProps {
    type: TaskType;
    task: AnyTaskDTO;
    onUpdate: (updatedTask: AnyTaskDTO) => void;
    onDelete: (taskId: string) => void;
}

export const TaskFactory = ({
    type,
    task,
    onUpdate,
    onDelete,
}: TaskFactoryProps) => {
    switch (type) {
        case "basic":
            return (
                <BasicTask
                    task={task as BasicTaskDTO}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "timed":
            return (
                <TimedTask
                    task={task as TimedTaskDTO}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        case "checklist":
            return (
                <ChecklistTask
                    task={task as ChecklistTaskDTO}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
        default:
            return (
                <BasicTask
                    task={task as BasicTaskDTO}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            );
    }
};
