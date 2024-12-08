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
import React, { useEffect, useState, useCallback } from "react";
import { getCustomers, getChecklists } from '@/lib/checklists/actions';
import { useRouter } from "next/navigation";
import { AddNewCustomer } from "./add-new-customer-modal"

type CardProps = React.ComponentProps<typeof Card>

export function SelectCustomerCard({ ...props }: CardProps) {

    interface Customer {
        customerid: number;
        customername: string;
      }
      
      interface Checklist {
        checklistId: number; 
        checklistName: string;
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

    const fetchCustomers = async () => {
        const customersData = await getCustomers() as Customer[];
        setCustomers(customersData);
    };

    const memoizedFetchCustomers = useCallback(fetchCustomers, []);

    useEffect(() => {
        memoizedFetchCustomers();
    }, [memoizedFetchCustomers]);

    useEffect(() => {
        const fetchChecklists = async () => {
            if (selectedCustomerId) {

                    const checklistData = await getChecklists(selectedCustomerId) as Checklist[];
                    setChecklists(checklistData);
                    console.log(checklistData);

            } else {
                setChecklists([]);
            }
        };

        fetchChecklists();
    }, [selectedCustomerId]);
    

    return (


        <Card className="min-w-96 max-w-500px" {...props}>
            <CardHeader>
                <CardTitle className="text-center">
                    <div>Select checklist to view</div>
                </CardTitle>
                <div>
                    <CardDescription className="text-center">
                        View checklists for customers
                    </CardDescription>
                </div>
            </CardHeader>
            <Separator />
            <CardContent >
                <div className="flex justify-between">
                    <div className="pt-3">Customer name</div>
                    <AddNewCustomer onCustomerAdded={memoizedFetchCustomers} />
                </div>
                <Popover 
                    open={selectCustomerPopup} 
                    onOpenChange={setSelectCustomerPopup}
                >
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
                                        <CommandGroup key="customers-group">
                                            {customers.map((customer) => (
                                                <CommandItem
                                                    key={`customer-${customer.customerid}`}
                                                    value={customer.customername}
                                                    onSelect={() => {
                                                        setSelectedCustomer(customer.customername);
                                                        setSelectCustomerPopup(false);
                                                        setSelectedCustomerId(customer.customerid);
                                                        setSelectedChecklist('');
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
                        disabled={!selectedCustomer}
                    >
                        {!selectedCustomer 
                            ? "Select customer" 
                            : !selectedChecklist 
                                ? "Select checklist" 
                                : selectedChecklist}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-md max-w-md p-0">
                                <Command>
                                    <CommandInput placeholder="Search checklist" />
                                    <CommandList>
                                        <CommandEmpty>No checklist found.</CommandEmpty>
                                        <CommandGroup key="checklists-group">
                                            {checklists.map((checklist) => (
                                                <CommandItem
                                                    key={`checklist-${checklist.checklistId}`}
                                                    value={checklist.checklistName}
                                                    onSelect={() => {
                                                        setSelectedChecklist(checklist.checklistName)
                                                        setSelectedChecklistId(checklist.checklistId)
                                                        setSelectChecklistPopup(false);
                                                        console.log(checklists);
                                                    }}
                                                >
                                                    {checklist.checklistName}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            selectedChecklist === checklist.checklistName ? "opacity-100" : "opacity-0"
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
                    disabled={!selectedChecklistId}
                    className="w-full"
                    >
                    Open template
                </Button>
            </CardFooter>
        </Card>
    );
}