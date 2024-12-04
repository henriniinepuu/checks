"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCustomerFromChecklist, getCustomerName, getTasks } from "@/lib/checklists/actions";
import { usePathname } from "next/navigation";
import { AddNewTask } from "./add-new-task-modal";
import { EditTask } from "./edit-task-modal";

type CardProps = React.ComponentProps<typeof Card>;

export function ViewChecklistCard({ ...props }: CardProps) {
  interface Task {
    taskid: number;
    taskname: string;
    taskinstructions: string;
    groupid: number;
    tasksequence: number;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [checklistName, setChecklistName] = useState<string>('');

  const checklistId = parseInt(usePathname().split("/")[2]);

  useEffect(() => {
    const fetchCheckListData = async () => {
      const checklistData = await getCustomerFromChecklist(checklistId);
      if (checklistData.length > 0) {
        setChecklistName(checklistData[0]?.checklistname || '');

        const customerData = await getCustomerName(checklistData[0]?.customerid);
        setCustomerName(customerData[0]?.customername || '');

        const tasksData = await getTasks(checklistId) as Task[];
        setTasks(tasksData);
      }
    };
    fetchCheckListData();
  }, [checklistId]);

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle>{customerName}</CardTitle>
        <div>
          <CardDescription>
            <div>
              Checklist: <strong>{checklistName} </strong>
            </div>
          </CardDescription>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="pt-3 flex justify-between items-center">
          <div className="font-bold">OS tasks</div>
          <AddNewTask taskGroupId={1} checklistId={checklistId} onSubmit={handleAddTask} />
        </div>
        <div className="pt-3">
          {tasks
            .filter((task) => task.groupid === 1)
            .map((tasks, index) => (
              <div
                className="flex justify-between m-2 p-2 outline-dotted outline-2 outline-muted rounded-md bg-neutral-50"
                key={index}
              >
                <div className="items-start last:mb-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{tasks.taskname}</p>
                    <p className="text-sm text-muted-foreground">{tasks.taskinstructions}</p>
                  </div>
                </div>
                <div className="flex items-center ml-3">
                  <EditTask
                    taskId={tasks.taskid}
                    taskName={tasks.taskname}
                    taskInstructions={tasks.taskinstructions}
                    taskSequence={tasks.tasksequence}
                    onSubmit={(updatedTask) => {
                      setTasks((prevTasks: Task[]) => {
                        return prevTasks.map((task) =>
                          task.taskid === updatedTask.taskid ? { ...task, ...updatedTask } : task
                        );
                      });
                    }}
                    onDelete={(taskId) => {
                      setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.taskid !== taskId));
                    }}
                  />
                </div>
              </div>
            ))}
        </div>

        <Separator />
        <div className="pt-3 flex justify-between items-center">
          <div className="font-bold">User profile tasks</div>
          <AddNewTask taskGroupId={2} checklistId={checklistId} onSubmit={handleAddTask} />
        </div>
        <div className="pt-3">
          {tasks
            .filter((task) => task.groupid === 2)
            .map((tasks, index) => (
              <div
                className="flex justify-between m-2 p-2 outline-dotted outline-2 outline-muted rounded-md bg-neutral-50"
                key={index}
              >
                <div className="items-start last:mb-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{tasks.taskname}</p>
                    <p className="text-sm text-muted-foreground">{tasks.taskinstructions}</p>
                  </div>
                </div>
                <div className="ml-3 items-center">
                  <EditTask
                    taskId={tasks.taskid}
                    taskName={tasks.taskname}
                    taskInstructions={tasks.taskinstructions}
                    taskSequence={tasks.tasksequence}
                    onSubmit={(updatedTask) => {
                      setTasks((prevTasks: Task[]) => {
                        return prevTasks.map((task) =>
                          task.taskid === updatedTask.taskid ? { ...task, ...updatedTask } : task
                        );
                      });
                    }}
                    onDelete={(taskId) => {
                      setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.taskid !== taskId));
                    }}
                  />
                </div>
              </div>
            ))}
        </div>

        <Separator />
        <div className="pt-3 flex justify-between items-center">
          <div className="font-bold">Last steps</div>
          <AddNewTask taskGroupId={3} checklistId={checklistId} onSubmit={handleAddTask} />
        </div>
        <div className="pt-3">
          {tasks
            .filter((task) => task.groupid === 3)
            .map((tasks, index) => (
              <div
                className="flex justify-between m-2 p-2 outline-dotted outline-2 outline-muted rounded-md bg-neutral-50"
                key={index}
              >
                <div className="items-start last:mb-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{tasks.taskname}</p>
                    <p className="text-sm text-muted-foreground">{tasks.taskinstructions}</p>
                  </div>
                </div>
                <div className="ml-3">
                  <EditTask
                    taskId={tasks.taskid}
                    taskName={tasks.taskname}
                    taskInstructions={tasks.taskinstructions}
                    taskSequence={tasks.tasksequence}
                    onSubmit={(updatedTask) => {
                      setTasks((prevTasks: Task[]) => {
                        return prevTasks.map((task) =>
                          task.taskid === updatedTask.taskid ? { ...task, ...updatedTask } : task
                        );
                      });
                    }}
                    onDelete={(taskId) => {
                      setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.taskid !== taskId));
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Generate PDF</Button>
      </CardFooter>
    </Card>
  );
}