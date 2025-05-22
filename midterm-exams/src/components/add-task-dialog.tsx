"use client";

import type React from "react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import type {
    AnyTaskDTO,
    BasicTaskDTO,
    ChecklistTaskDTO,
    TaskType,
    TimedTaskDTO,
} from "~/lib/types/task";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { CalendarIcon, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { format } from "date-fns";

interface AddTaskDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Omit<AnyTaskDTO, "id">) => void;
}

export function AddTaskDialog({
    isOpen,
    onClose,
    onAddTask,
}: AddTaskDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskType, setTaskType] = useState<TaskType>("basic");
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [duration, setDuration] = useState(60); // in minutes

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        switch (taskType) {
            case "timed":
                const timed: Omit<TimedTaskDTO, "id"> = {
                    title,
                    description: description || undefined,
                    dueDate,
                    isCompleted: false,
                    taskType: "timed",
                    duration,
                    timeRemaining: duration,
                };
                onAddTask(timed);
                resetForm();
                break;
            case "checklist":
                const checklist: Omit<ChecklistTaskDTO, "id"> = {
                    title,
                    description: description || undefined,
                    dueDate,
                    isCompleted: false,
                    taskType: "checklist",
                    items: [],
                };
                onAddTask(checklist);
                resetForm();
                break;
            default:
                const basic: Omit<BasicTaskDTO, "id"> = {
                    title,
                    description: description || undefined,
                    dueDate,
                    isCompleted: false,
                    taskType: "basic",
                };
                onAddTask(basic);
                resetForm();
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTaskType("basic");
        setDueDate(undefined);
        setDuration(60);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Add New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Task title"
                                required
                                className="text-base"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Task description (optional)"
                                className="resize-none min-h-[80px]"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Task Type</Label>
                            <Tabs
                                defaultValue="basic"
                                onValueChange={(value) =>
                                    setTaskType(value as TaskType)
                                }
                            >
                                <TabsList className="grid grid-cols-3">
                                    <TabsTrigger
                                        value="basic"
                                        className="flex items-center gap-2"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        Basic
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="timed"
                                        className="flex items-center gap-2"
                                    >
                                        <Clock className="h-4 w-4" />
                                        Timed
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="checklist"
                                        className="flex items-center gap-2"
                                    >
                                        <ListTodo className="h-4 w-4" />
                                        Checklist
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                    value="basic"
                                    className="pt-4"
                                >
                                    <p className="text-sm text-muted-foreground">
                                        A simple task with a title, description,
                                        and completion status.
                                    </p>
                                </TabsContent>

                                <TabsContent
                                    value="timed"
                                    className="pt-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="duration">
                                            Duration (minutes)
                                        </Label>
                                        <Input
                                            id="duration"
                                            type="number"
                                            min="1"
                                            value={duration}
                                            onChange={(e) =>
                                                setDuration(
                                                    Number.parseInt(
                                                        e.target.value,
                                                    ),
                                                )
                                            }
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            A task with a timer that counts down
                                            from the specified duration.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent
                                    value="checklist"
                                    className="pt-4"
                                >
                                    <p className="text-sm text-muted-foreground">
                                        A task with a list of items that can be
                                        checked off individually.
                                    </p>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="grid gap-2">
                            <Label>Due Date (optional)</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "justify-start text-left font-normal",
                                            !dueDate && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dueDate
                                            ? format(dueDate, "PPP")
                                            : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dueDate}
                                        onSelect={setDueDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Add Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
