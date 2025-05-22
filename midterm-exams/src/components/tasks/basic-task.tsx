"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { TaskDecorator } from "~/components/task-decorator";
import type { BasicTaskDTO } from "~/lib/types/task";

import { Trash, ClipboardList } from "lucide-react";

interface BasicTaskProps {
    task: BasicTaskDTO;
    onUpdate: (updatedTask: BasicTaskDTO) => void;
    onDelete: (taskId: string) => void;
}

export const BasicTask = ({ task, onUpdate, onDelete }: BasicTaskProps) => {
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    const handleToggleComplete = () => {
        const updatedTask = {
            ...task,
            isCompleted: !isCompleted,
        };
        setIsCompleted(!isCompleted);
        onUpdate(updatedTask);
    };

    return (
        <TaskDecorator task={task}>
            <div
                className={`p-4 h-full transition-all ${isCompleted ? "bg-muted/50" : ""}`}
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <ClipboardList className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium text-primary">
                            Basic
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                        checked={isCompleted}
                        onCheckedChange={handleToggleComplete}
                        id={`task-${task.id}`}
                        className="h-5 w-5"
                    />
                    <label
                        htmlFor={`task-${task.id}`}
                        className={`font-medium text-lg ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                    >
                        {task.title}
                    </label>
                </div>

                {task.description && (
                    <p
                        className={`text-sm mb-4 ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                    >
                        {task.description}
                    </p>
                )}

                <div className="flex justify-between items-center mt-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(task.id)}
                        className="h-8 w-8"
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </TaskDecorator>
    );
};
