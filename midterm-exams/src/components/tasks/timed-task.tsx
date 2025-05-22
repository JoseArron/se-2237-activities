"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import type { TimedTaskDTO } from "~/lib/types/task";
import { formatDuration } from "~/lib/utils";
import { Progress } from "~/components/ui/progress";
import { TaskDecorator } from "~/components/task-decorator";

import { Trash, Play, Pause, Clock } from "lucide-react";

interface TimedTaskProps {
    task: TimedTaskDTO;
    onUpdate: (updatedTask: TimedTaskDTO) => void;
    onDelete: (taskId: string) => void;
}

export const TimedTask = ({ task, onUpdate, onDelete }: TimedTaskProps) => {
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    const [timeRemaining, setTimeRemaining] = useState(
        task.timeRemaining ?? task.duration,
    );
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                const newTimeRemaining = timeRemaining - 1;
                setTimeRemaining(newTimeRemaining);

                onUpdate({
                    ...task,
                    timeRemaining: newTimeRemaining,
                });

                if (newTimeRemaining <= 0) {
                    setIsRunning(false);
                    setIsCompleted(true);
                    onUpdate({
                        ...task,
                        isCompleted: true,
                        timeRemaining: 0,
                    });
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeRemaining, task, onUpdate]);

    const handleToggleComplete = () => {
        const updatedTask = {
            ...task,
            isCompleted: !isCompleted,
        };
        setIsCompleted(!isCompleted);
        setIsRunning(false);
        onUpdate(updatedTask);
    };

    const toggleTimer = () => {
        if (isCompleted) return;
        setIsRunning(!isRunning);
    };

    const progress = ((task.duration - timeRemaining) / task.duration) * 100;

    return (
        <TaskDecorator task={task}>
            <div
                className={`p-4 h-full transition-all ${isCompleted ? "bg-muted/50" : ""}`}
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium text-primary">
                            Timed
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
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
                    <Button
                        variant={isRunning ? "destructive" : "outline"}
                        size="sm"
                        onClick={toggleTimer}
                        disabled={isCompleted}
                        className="h-8"
                    >
                        {isRunning ? (
                            <>
                                <Pause className="h-4 w-4 mr-1" /> Pause
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4 mr-1" /> Start
                            </>
                        )}
                    </Button>
                </div>

                {task.description && (
                    <p
                        className={`text-sm mb-2 ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                    >
                        {task.description}
                    </p>
                )}

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">
                            {formatDuration(timeRemaining)}
                        </span>
                        <span className="text-muted-foreground">
                            of {formatDuration(task.duration)}
                        </span>
                    </div>
                    <Progress
                        value={progress}
                        className="h-2"
                    />
                </div>

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
