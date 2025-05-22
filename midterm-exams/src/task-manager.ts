import { subDays } from "date-fns";
import { v4 as uuid } from "uuid";
import type { AnyTaskDTO, TaskEntity } from "~/lib/types/task";
import { TaskAdapter } from "./lib/adapters/task-adapter";

// 2. Singleton

class TaskManagerClass {
    private static instance: TaskManagerClass;
    private tasks: TaskEntity[] = [];

    public static getInstance(): TaskManagerClass {
        if (!TaskManagerClass.instance) {
            TaskManagerClass.instance = new TaskManagerClass();
        }
        return TaskManagerClass.instance;
    }

    public getTasks(): TaskEntity[] {
        if (this.tasks.length === 0) {
            this.loadMockData();
        }
        return [...this.tasks];
    }

    private loadMockData(): void {
        const date = new Date().getTime();

        const mockData: TaskEntity[] = [
            {
                id: "basic-1",
                title: "usability testing",
                description: "Make usabuility testing forms and perform tests",
                dueDate: new Date(subDays(date, 1)).toISOString(),
                isCompleted: false,
                taskType: "basic",
            },
            {
                id: "timed-1",
                title: "study art appre exam",
                dueDate: new Date(subDays(date, 1)).toISOString(),
                isCompleted: false,
                taskType: "timed",
                duration: 1000,
            },
            {
                id: "checklist-1",
                title: "Backlogs",
                description: "my backlogs",
                dueDate: new Date(subDays(date, 1)).toISOString(),
                isCompleted: false,
                taskType: "checklist",
                items: [
                    {
                        id: "111111",
                        text: "e2e testing",
                        isCompleted: false,
                    },
                    {
                        id: "222222",
                        text: "storybook stuff",
                        isCompleted: true,
                    },
                    {
                        id: "333",
                        text: "conceptual framework",
                        isCompleted: false,
                    },
                    {
                        id: "4444",
                        text: "finalize project report",
                        isCompleted: false,
                    },
                ],
            },
        ];

        this.tasks = mockData;
    }

    public addTask(task: Omit<AnyTaskDTO, "id">): void {
        const newTask = {
            ...task,
            id: uuid(),
        } as AnyTaskDTO;

        const taskEntity = TaskAdapter.toEntity(newTask);

        this.tasks.push(taskEntity);
    }

    public updateTask(updatedTask: AnyTaskDTO): void {
        const taskEntity = TaskAdapter.toEntity(updatedTask);

        this.tasks = this.tasks.map((task) =>
            task.id === taskEntity.id ? taskEntity : task,
        );
    }

    public removeTask(taskId: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
}

export const TaskManager = TaskManagerClass.getInstance();
