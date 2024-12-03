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





export function EditTask() {
    const [taskName,  setTaskName] = React.useState("");
    const [taskInstructions,  setTaskInstructions] = React.useState("");


    const handleSubmit = () => {
        if (taskName.trim() === "") {
            return;
        }

        setTaskName(taskName);
        setTaskInstructions(taskInstructions);

    };

    const handleDelete = () => {
        
    };

    return (
        <Dialog>
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
                        <Input id="taskname" placeholder="Task name"/>
                    </div>
                    <div >Instructions</div>
                    <div >
                        <Textarea id="taskinstructions" placeholder="Internal instructions"/>
                    </div>
                </div>
                <DialogFooter className="flex">
                    <Button variant="destructive" onClick={handleDelete} className="w-full">Delete</Button>
                    <Button onClick={handleSubmit} className="w-full">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}