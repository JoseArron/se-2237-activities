"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import type { ChecklistTaskDTO } from "~/lib/types/task";
import { Input } from "~/components/ui/input";
import { TaskDecorator } from "~/components/task-decorator";
import { Progress } from "~/components/ui/progress";

import { Trash, Plus, CheckSquare } from "lucide-react";
import { v4 as uuid } from "uuid";

interface ChecklistTaskProps {
    task: ChecklistTaskDTO;
    onUpdate: (updatedTask: ChecklistTaskDTO) => void;
    onDelete: (taskId: string) => void;
}

export const ChecklistTask = ({
    task,
    onUpdate,
    onDelete,
}: ChecklistTaskProps) => {
    const [newItemText, setNewItemText] = useState("");

    const handleToggleComplete = () => {
        const allCompleted = task.items.every((item) => item.isCompleted);
        const updatedTask = {
            ...task,
            isCompleted: !allCompleted,
            items: task.items.map((item) => ({
                ...item,
                isCompleted: !allCompleted,
            })),
        };
        onUpdate(updatedTask);
    };

    const handleToggleItem = (itemId: string) => {
        const updatedItems = task.items.map((item) =>
            item.id === itemId
                ? { ...item, isCompleted: !item.isCompleted }
                : item,
        );

        const updatedTask = {
            ...task,
            items: updatedItems,
            isCompleted: updatedItems.every((item) => item.isCompleted),
        };

        onUpdate(updatedTask);
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemText.trim()) return;

        const newItem = {
            id: uuid(),
            text: newItemText,
            isCompleted: false,
        };

        const updatedTask = {
            ...task,
            items: [...task.items, newItem],
        };

        onUpdate(updatedTask);
        setNewItemText("");
    };

    const completedCount = task.items.filter((item) => item.isCompleted).length;
    const totalCount = task.items.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <TaskDecorator task={task}>
            <div
                className={`p-4 h-full transition-all ${task.isCompleted ? "bg-muted/50" : ""}`}
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <CheckSquare className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium text-primary">
                            Checklist
                        </span>
                    </div>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {completedCount}/{totalCount} completed
                    </span>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                        checked={task.isCompleted}
                        onCheckedChange={handleToggleComplete}
                        id={`task-${task.id}`}
                        className="h-5 w-5"
                    />
                    <label
                        htmlFor={`task-${task.id}`}
                        className={`font-medium text-lg ${task.isCompleted ? "line-through text-muted-foreground" : ""}`}
                    >
                        {task.title}
                    </label>
                </div>

                {task.description && (
                    <p
                        className={`text-sm mb-2 ${task.isCompleted ? "line-through text-muted-foreground" : ""}`}
                    >
                        {task.description}
                    </p>
                )}

                <Progress
                    value={progress}
                    className="h-2 mb-3"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {task.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md"
                        >
                            <Checkbox
                                checked={item.isCompleted}
                                onCheckedChange={() =>
                                    handleToggleItem(item.id)
                                }
                                id={`item-${item.id}`}
                            />
                            <label
                                htmlFor={`item-${item.id}`}
                                className={`text-sm ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}
                            >
                                {item.text}
                            </label>
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={handleAddItem}
                    className="flex items-center space-x-2 mb-2"
                >
                    <Input
                        type="text"
                        placeholder="Add new item"
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        className="h-9 text-sm"
                    />
                    <Button
                        type="submit"
                        size="sm"
                        variant="outline"
                        className="h-9 px-3"
                    >
                        <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                </form>

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
