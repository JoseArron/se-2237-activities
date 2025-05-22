"use client";

import { useState } from "react";
import type { AnyTaskDTO, TaskDTO } from "~/lib/types/task";
import { TaskFactory } from "~/task-factory";
import { TaskManager } from "~/task-manager";
import { TaskSortingStrategy } from "~/task-sorting-strategy";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { AddTaskDialog } from "./add-task-dialog";
import { TaskAdapter } from "~/lib/adapters/task-adapter";

import { PlusCircle, SortAsc } from "lucide-react";
import { motion } from "framer-motion";

export function TaskList() {
    const [tasks, setTasks] = useState<AnyTaskDTO[]>(() =>
        // convert received tasks to the interface used in the ui
        TaskManager.getTasks().map((task) => TaskAdapter.toDTO(task)),
    );
    const [sortStrategy, setSortStrategy] = useState<string>("date");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const refreshTasks = () => {
        setTasks(TaskManager.getTasks().map((task) => TaskAdapter.toDTO(task)));
    };

    const handleUpdateTask = (updatedTask: AnyTaskDTO) => {
        TaskManager.updateTask(updatedTask);
        refreshTasks();
    };

    const handleDeleteTask = (taskId: string) => {
        TaskManager.removeTask(taskId);
        refreshTasks();
    };

    const handleAddTask = (task: Omit<TaskDTO, "id">) => {
        TaskManager.addTask(task);
        refreshTasks();
        setIsAddDialogOpen(false);
    };

    const getSortedTasks = (): AnyTaskDTO[] => {
        const filteredTasks = [...tasks];
        switch (sortStrategy) {
            case "date":
                return TaskSortingStrategy.sortByDate(filteredTasks);
            case "name":
                return TaskSortingStrategy.sortByName(filteredTasks);
            case "id":
                return TaskSortingStrategy.sortById(filteredTasks);
            default:
                return filteredTasks;
        }
    };

    const sortedTasks = getSortedTasks();

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center justify-center mb-10 mt-12 md:mt-16"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-br from-slate-700 via-slate-800 to-black dark:from-slate-200 dark:via-slate-300 dark:to-slate-400">
                    To-Do List Application with Design Patterns
                </h1>
            </motion.div>
            <div className="p-4 md:p-6 mb-8 bg-card border border-border rounded-xl shadow-md">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <SortAsc className="h-5 w-5 text-muted-foreground" />
                        <Select
                            value={sortStrategy}
                            onValueChange={setSortStrategy}
                        >
                            <SelectTrigger className="w-full sm:w-[180px] bg-background">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">Due Date</SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="id">ID</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="w-full sm:w-auto mt-3 sm:mt-0 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Task
                    </Button>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {sortedTasks.map((task, index) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        // delay each task animation
                        transition={{ delay: index * 0.05 }}
                    >
                        <TaskFactory
                            type={task.taskType}
                            task={task}
                            onUpdate={handleUpdateTask}
                            onDelete={handleDeleteTask}
                        />
                    </motion.div>
                ))}
            </motion.div>
            <AddTaskDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAddTask={handleAddTask}
            />
        </div>
    );
}
