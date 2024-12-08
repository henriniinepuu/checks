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
import { addCustomer } from "@/lib/checklists/actions";
import { useToast } from '@/hooks/use-toast';


export function AddNewCustomer({onCustomerAdded}: {onCustomerAdded: () => void}) {
    const [customerName, setCustomerName] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const { toast } = useToast()
    const handleCustomerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerName(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await addCustomer(customerName);
            setIsOpen(false);
            setCustomerName("");
            onCustomerAdded?.();
            
        } catch {
            toast({
                variant: "destructive",
                title: "Error adding customer:",
                description: `The customer name "${customerName}" already exists`,
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
                    <DialogTitle>Add new customer</DialogTitle>
                    <DialogDescription>
                        Customers right now are not with to Halo
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-col space-y-2">
                    <div>Customer name</div>
                    <div>
                        <Input
                            id="customerName"
                            placeholder="Customer name"
                            value={customerName}
                            onChange={handleCustomerNameChange}
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