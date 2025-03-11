import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/generated/ui/accordion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/shadcn/generated/ui/resizable";
import { ScrollArea } from "@/lib/shadcn/generated/ui/scroll-area";
import type { Plan } from "../lib/graphql/generated/graphql-types";

type Props = {
  plan: Pick<Plan, "title" | "pointsOfInterest">;
};
export default function PlanDetail({ plan }: Props) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[90vh]">
        <img
          src={`http://localhost:7000/files/${plan.pictureUrl}`}
          alt={plan.title ?? `Plan for scenario ${plan.title}`}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ScrollArea className="h-[90vh]">
          <Accordion type="single" collapsible className="w-full">
            {plan.pointsOfInterest.map((poi) => (
              <AccordionItem value={`key-${poi.id}`} key={poi.id}>
                <AccordionTrigger>
                  {poi.code} - {poi.title}
                </AccordionTrigger>
                <AccordionContent>{poi.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
