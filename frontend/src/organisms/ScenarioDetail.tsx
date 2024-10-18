import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/ui/accordion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/shadcn/ui/resizable";
import { ScrollArea } from "@/lib/shadcn/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/shadcn/ui/tabs";
import type { Scenario } from "../lib/graphql/generated/graphql-types";

type Props = {
  data: Scenario;
};
export default function ScenarioDetail({ data }: Props) {
  return (
    <>
      <h2>{data.title}</h2>
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="flashcards">FlashCards</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <p>Home</p>
        </TabsContent>
        <TabsContent value="plans">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <img
                src={data.plans[0].pictureUrl}
                alt={data.plans[0].title ?? `Plan for scenario ${data.title}`}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <ScrollArea>
                <Accordion type="single" collapsible className="w-full">
                  {data.plans[0].pointsOfInterest.map((poi) => (
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
        </TabsContent>
        <TabsContent value="flashcards">
          <p>FlashCards</p>
        </TabsContent>
      </Tabs>
    </>
  );
}
