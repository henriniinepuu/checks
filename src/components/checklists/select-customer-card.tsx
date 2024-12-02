"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react";
import { getCustomers, getChecklists } from '@/lib/checklists/actions';
import { useRouter } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>

export function SelectCustomerCard({ ...props }: CardProps) {
    interface Customer {
        customerid: number;
        customername: string;
      }
      
      interface Checklist {
        checklistid: number; 
        checklistname: string;
      }

    const router = useRouter()
    const [selectCustomerPopup, setSelectCustomerPopup] = useState(false);
    const [selectChecklistPopup, setSelectChecklistPopup] = useState(false);
    
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');
    const [selectedCustomerId, setSelectedCustomerId] = useState<number>();
    const [selectedChecklist, setSelectedChecklist] = useState<string>('');
    const [selectedChecklistId, setSelectedChecklistId] = useState<number>();
    
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [checklists, setChecklists] = useState<Checklist[]>([]);

    const [customerLoading, setCustomerLoading] = useState(true);
    const [checklistLoading, setChecklistLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
        try {
            const customerData = await getCustomers() as Customer[];
            setCustomers(customerData);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setCustomerLoading(false);
        }
        };

        fetchCustomers();
    }, []);

    useEffect(() => {
        const fetchChecklists = async () => {
            if (selectedCustomerId) {
                try {
                    setChecklistLoading(true);
                    const checklistData = await getChecklists(selectedCustomerId) as Checklist[];
                    setChecklists(checklistData);
                } catch (error) {
                    console.error("Error fetching checklists:", error);
                } finally {
                    setChecklistLoading(false);
                }
            } else {
                setChecklists([]);
            }
        };

        fetchChecklists();
    }, [selectedCustomerId]);
    

    if (customerLoading) {
        return <div>Loading...</div>;
    }

    return (


        <Card className="min-w-96 max-w-500px" {...props}>
            <CardHeader>
                <CardTitle className="text-center">
                    <div>Select template to view</div>
                </CardTitle>
                <div>
                    <CardDescription className="text-center">
                        View templates for customers
                    </CardDescription>
                </div>
            </CardHeader>
            <Separator />
            <CardContent >
                <div className="pt-3">Customer name</div>

                <Popover open={selectCustomerPopup} onOpenChange={setSelectCustomerPopup}>

                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={selectCustomerPopup}
                        className="justify-between w-full"
                    >
                        {!selectedCustomer ? "Select customer" : selectedCustomer}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-md max-w-md p-0">
                                <Command>
                                    <CommandInput placeholder="Search customer" />
                                    <CommandList>
                                        <CommandEmpty>No customer found.</CommandEmpty>
                                        <CommandGroup>
                                            {customers.map((customer) => (
                                                <CommandItem
                                                    key={customer.customerid}
                                                    value={customer.customername}
                                                    onSelect={() => {
                                                        setSelectedCustomer(customer.customername)
                                                        setSelectCustomerPopup(false);
                                                        setSelectedCustomerId(customer.customerid);
                                                        setSelectedChecklist('')

                                                    }}
                                                >
                                                    {customer.customername}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            selectedCustomer  === customer.customername ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                </Popover>
                <div className="pt-3">Select checklist</div>
                <Popover open={selectChecklistPopup} onOpenChange={setSelectChecklistPopup}>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={selectChecklistPopup}
                        className="justify-between w-full"
                        disabled={!selectedCustomer} // Disable until a customer is selected
                        onLoad={() => {
                            <div>Loading checklists</div>
                        }}
                    >
                        {!selectedCustomer ? "Select customer" : !selectedChecklist ? "Select checklist" : selectedChecklist}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-md max-w-md p-0">
                                <Command>
                                    <CommandInput placeholder="Search checklist" />
                                    <CommandList>
                                        <CommandEmpty>No checklist found.</CommandEmpty>
                                        <CommandGroup>
                                            {
                                            checklists.map((checklist) => (
                                                <CommandItem
                                                    key={checklist.checklistid}
                                                    value={checklist.checklistname}
                                                    onSelect={() => {
                                                        setSelectedChecklist(checklist.checklistname)
                                                        setSelectedChecklistId(checklist.checklistid)
                                                        setSelectChecklistPopup(false);

                                                    }}
                                                >
                                                    {checklist.checklistname}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            selectedChecklist === checklist.checklistname ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                </Popover>
            </CardContent>
            <CardFooter>
                <Button 
                    onClick={() => router.push(`/view-checklist/${selectedChecklistId}`)} 
                    disabled={!selectedChecklistId || checklistLoading}
                    className="w-full"
                    >
                    Open template
                </Button>
            </CardFooter>
        </Card>
    );
}