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
import { addChecklist } from "@/lib/checklists/actions";
import { useToast } from '@/hooks/use-toast';


export function AddNewChecklist({onChecklistAdded, customerId}: {onChecklistAdded: () => void, customerId: number}) {
    const [checklistName, setChecklistName] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const { toast } = useToast()
    const handleChecklistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecklistName(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await addChecklist(checklistName, customerId);
            setIsOpen(false);
            setChecklistName("");
            onChecklistAdded?.();
            
        } catch {
            toast({
                variant: "destructive",
                title: "Error adding Checklist:",
                description: `The checklist name "${checklistName}" already exists`,
            });
            
        } finally {
            setIsLoading(false);
            
        }
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
                    <DialogTitle>Add new checklist</DialogTitle>
                    <DialogDescription>
                        Here you can just create a new checklist, but you can add new tasks if you open it up
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-col space-y-2">
                    <div>Checklist name</div>
                    <div>
                        <Input
                            id="checklistName"
                            placeholder="Checklist name"
                            value={checklistName}
                            onChange={handleChecklistNameChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={isLoading || checklistName.trim().length === 0} className="w-full">
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}