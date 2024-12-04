import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import React from 'react'
import { Textarea } from "../ui/textarea";
import { deleteTask, patchTasks } from "@/lib/checklists/actions";

interface Task {
    taskid: number,
    taskname: string,
    taskinstructions: string,
}

interface EditTaskProps {
    taskId: number,
    taskName: string,
    taskInstructions: string,
    taskSequence: number,
    onSubmit: (updatedTask: Task) => void,
    onDelete: (taskId: number) => void,
}


export function EditTask({
    taskId,
    taskName: initialTaskName,
    taskInstructions: initialTaskInstructions,
    onSubmit,
    onDelete,
}: EditTaskProps) 
 {
    const [taskName,  setTaskName] = React.useState(initialTaskName);
    const [taskInstructions,  setTaskInstructions] = React.useState(initialTaskInstructions);
    const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);
    const [isLoadingChange, setIsLoadingChange] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSubmit = async () => {
        if (taskName.trim() === "") {
            return(<div>Task name is required</div>);
        }
        await patchTasks(taskId, taskName, taskInstructions);
        onSubmit({ taskid: taskId, taskname: taskName, taskinstructions: taskInstructions });
        setIsLoadingChange(false);
        setIsOpen(false);
    };

    const handleDelete = async () => {
        await deleteTask(taskId);
        onDelete(taskId);
        setIsLoadingDelete(false);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="xs">
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="text-start">
                    <DialogTitle>Edit checklist step</DialogTitle>
                </DialogHeader>
                <div className="flex-col space-y-2">
                    <div >Task name</div>
                    <div >
                        <Input 
                            id="taskname" 
                            placeholder="Task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div >Instructions</div>
                    <div >
                        <Textarea 
                            id="taskinstructions" 
                            placeholder="Internal instructions"
                            value={taskInstructions}
                            onChange={(e) => setTaskInstructions(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="flex">
                    <Button onClick={handleDelete} disabled={isLoadingDelete} className="w-3/12" variant="destructive" >{isLoadingDelete ? "Deleting..." : "Delete"}</Button>
                    <Button onClick={handleSubmit} disabled={isLoadingChange} className="w-9/12">{isLoadingChange ? "Submitting..." : "Submit"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}