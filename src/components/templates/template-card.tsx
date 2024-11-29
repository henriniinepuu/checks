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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const osTasks = [
  {
    title: "Istall OS",
    description: "MDT profile Win 10 Elke",
  },
  {
    title: "Join with domain",
    description: "int.primend.com",
  },
  {
    title: "Install Teams",
    description: "Install teams",
  },
]

const userTasks = [
  {
    title: "Open Outlook",
    description: "MDT profile Win 10 Elke",
  },
  {
    title: "Sync Desktop, Documents",
    description: "",
  },
  {
    title: "Install ELVA",
    description: "located at www.elva.com/download",
  },
]

const extraTasks = [
  {
    title: "Clean computer visually",
    description: "Makes ure computer does not have any dirt on it",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function TemplateCard({ ...props }: CardProps) {
  return (
    <Card className="min-w-96 max-w-500px"{...props}>
      <CardHeader>
        <div>Customer name</div>
        <CardTitle>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select customer"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primend-ou">Primend OÜ</SelectItem>
              <SelectItem value="primend-sia">Primend SIA</SelectItem>
              <SelectItem value="primend-uab">Primend UAB</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
        <div>
        <CardDescription>
          <div>Template</div>
          <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select template"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arendaja">Arendaja</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="muu">Muu</SelectItem>
              </SelectContent>
            </Select>
        </CardDescription>
        </div>
       
      </CardHeader>
      <Separator className="w-10/12"/>
      <CardContent className="grid gap-4">
        <p className="pt-5 font-bold">OS tasks</p>
        <div className="pt-5">
          {osTasks.map((osTasks, index) => (
            <div className="flex justify-between" key={index}>
              <div
                className=" items-start pb-4 last:mb-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {osTasks.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {osTasks.description}
                  </p>
                  
                </div>
                
              </div>
              <div>
                <Switch />
              </div>
            </div>
            
          ))}
        </div>
        <Separator />
        <p className="font-bold">User tasks</p>
        <div className="pt-5">
          {userTasks.map((userTasks, index) => (
            <div className="flex justify-between" key={index}>
              <div
                className=" items-start pb-4 last:mb-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {userTasks.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {userTasks.description}
                  </p>
                </div>
                
              </div>
              <div>
                <Switch />
              </div>
            </div>
            
          ))}
        </div>

        <Separator />
        <p className="font-bold">Last checks</p>
        <div className="pt-5">
          {extraTasks.map((extraTasks, index) => (
            <div className="flex justify-between" key={index}>
              <div
                className=" items-start pb-4 last:mb-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {extraTasks.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {extraTasks.description}
                  </p>
                </div>
                
              </div>
              <div>
                <Switch />
              </div>
            </div>
            
          ))}
        </div>

      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Save to Halo ticket
        </Button>
      </CardFooter>
    </Card>
  )
}
