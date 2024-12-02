"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="items-center justify-items-center pt-10">
      <main>
        <div className="flex flex-col space-y-4 justify-center ">
          <Button onClick={() => router.push("/view-checklist") }>View checklists</Button>
          <Button onClick={() => router.push("/edit-template") }>Edit templates</Button>
          <Button onClick={() => router.push("/create-template") }>Create templates</Button>
          <Button onClick={() => router.push("/test") }>TESTING PAGE</Button>
        </div >
        
      </main>

    </div>
  );
}
