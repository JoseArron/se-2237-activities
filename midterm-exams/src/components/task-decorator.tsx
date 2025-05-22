"use client";

import { type ReactNode, useEffect } from "react";
import type { TaskDTO } from "~/lib/types/task";
import { cn, formatDate, isOverdue } from "~/lib/utils";

import { toast } from "sonner";
import { Bell, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// 4. Decorator

interface TaskDecoratorProps {
    task: TaskDTO;
    children: ReactNode;
}

export const TaskDecorator = ({ task, children }: TaskDecoratorProps) => {
    const hasDueDate = !!task.dueDate;

    // 6. Observer
    // show toast if task is overdue dismiss if not
    useEffect(() => {
        if (task.dueDate && isOverdue(task.dueDate) && !task.isCompleted) {
            const overdueDuration = task.dueDate
                ? formatDistanceToNow(new Date(task.dueDate), {
                      addSuffix: true,
                  })
                : "";

            toast.error(
                `Task Overdue: "${task.title}" was due ${overdueDuration}`,
                {
                    id: `${task.id}`,
                    duration: 5000,
                },
            );
        } else {
            toast.dismiss(`${task.id}`);
        }
    }, [task.title, task.id, task.dueDate, task.isCompleted]);

    let bannerText = "";
    let bannerIcon = null;
    let bannerBgColor = "bg-slate-500";
    let bannerTextColor = "text-slate-50";

    if (task.dueDate) {
        if (isOverdue(task.dueDate) && !task.isCompleted) {
            bannerText = `Overdue! Due ${task.dueDate ? formatDistanceToNow(new Date(task.dueDate), { addSuffix: true }) : "N/A"}`;
            bannerIcon = <AlertTriangle className="h-4 w-4 mr-2" />;
            bannerBgColor = "bg-red-500 dark:bg-red-600";
            bannerTextColor = "text-white";
        } else {
            bannerText = `Due: ${task.dueDate ? formatDate(task.dueDate) : "N/A"}`;
            bannerIcon = <Bell className="h-4 w-4 mr-2" />;
            bannerBgColor = "bg-blue-500 dark:bg-blue-600";
            bannerTextColor = "text-white";
        }
    }

    return (
        <div className="relative w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            {hasDueDate && (
                <div
                    className={cn(
                        "px-4 py-2 flex items-center text-sm font-medium",
                        bannerBgColor,
                        bannerTextColor,
                    )}
                >
                    {bannerIcon}
                    <span>{bannerText}</span>
                </div>
            )}
            <div className="p-0">{children}</div>
        </div>
    );
};
