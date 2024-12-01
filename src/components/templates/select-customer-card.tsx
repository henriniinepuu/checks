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
import React from "react";
import { useState } from 'react';
import { getTemplateData } from '@/lib/checklists/actions';

type CardProps = React.ComponentProps<typeof Card>

export function SelectCustomerCard({ ...props }: CardProps) {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [data, setData] = useState<any[]>([]);

    const handleButtonClick = async () => {
        const fetchedData = await getTemplateData();
        setData(fetchedData);
      };

    return (
        <Card className="min-w-96 max-w-500px"{...props}>
        <CardHeader>
            <CardTitle>
                <div>
                    Select template to view
                </div>

            </CardTitle>
            <div>
            <CardDescription>
            <div className="pt-5">Customer name</div>
                <Popover open={open} onOpenChange={setOpen} >
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between w-full"
                        onClick={handleButtonClick}
                        >
                        
                        {value
                            ?  data.find(c => c.customername === value)
                            : "Select customer"}

                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-md max-w-md p-0">
                        <Command>
                        <CommandInput placeholder="Search customer" />
                        <CommandList>
                            <CommandEmpty>No customer found.</CommandEmpty>
                            <CommandGroup>
                            {data.map((item, index) => (
                                <CommandItem
                                key={item.customerid}
                                value={item.customername}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                                >
                                {item.customername}
                                <Check
                                    className={cn(
                                    "ml-auto",
                                    value === item.customername ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                </CommandItem>
                            ))}
                            
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                    </Popover>
                    {data.map((item, index) => (
                    <>key={index}{item.customername}{item.customerid}</>
                    ))}
            </CardDescription>
            </div>
        
        </CardHeader>
        <Separator className="w-10/12"/>
        <CardContent className="grid gap-4">

        </CardContent>
        <CardFooter>
            <Button className="w-full">
            Open template
            </Button>
        </CardFooter>
        </Card>
  )
}





