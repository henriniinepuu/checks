import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { addTask } from "@/lib/checklists/actions";

interface Task {
    taskid: number;
    taskname: string;
    taskinstructions: string;
    groupid: number;
    tasksequence: number;
}

interface AddNewTaskProps {
    taskGroupId: number;
    checklistId: number;
    onSubmit: (addedTask: Task) => void;
}

export function AddNewTask({ taskGroupId, checklistId, onSubmit }: AddNewTaskProps) {
    const [taskName, setTaskName] = React.useState("");
    const [taskInstructions, setTaskInstructions] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value);
    };

    const handleTaskInstructionsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskInstructions(event.target.value);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const { taskid, tasksequence } = await addTask(taskName, taskInstructions, taskGroupId, checklistId);
        setIsLoading(false);
        setIsOpen(false);

        // Call the onSubmit prop with the new task
        onSubmit({
            taskid,
            taskname: taskName,
            taskinstructions: taskInstructions,
            groupid: taskGroupId,
            tasksequence,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="xs">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="text-start">
                    <DialogTitle>Add new checklist step</DialogTitle>
                    <DialogDescription>
                        Task name will be visible to end users and instructions are only visible for specialists
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-col space-y-2">
                    <div>Task name</div>
                    <div>
                        <Input
                            id="taskname"
                            placeholder="Task name"
                            value={taskName}
                            onChange={handleTaskNameChange}
                        />
                    </div>
                    <div>Instructions</div>
                    <div>
                        <Textarea
                            id="taskinstructions"
                            placeholder="Internal instructions"
                            value={taskInstructions}
                            onChange={handleTaskInstructionsChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}