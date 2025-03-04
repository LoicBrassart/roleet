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
  data: Plan;
};
export default function PlanDetail({ data }: Props) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[90vh]">
        <img
          src={`http://localhost:7000/files/${data.pictureUrl}`}
          alt={data.title ?? `Plan for scenario ${data.title}`}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ScrollArea className="h-[90vh]">
          <Accordion type="single" collapsible className="w-full">
            {data.pointsOfInterest.map((poi) => (
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
