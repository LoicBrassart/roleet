import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/shadcn/generated/ui/resizable";
import { ScrollArea } from "@/lib/shadcn/generated/ui/scroll-area";
import type { Entities } from "@/types/entities";
import PointOfInterestList from "../PointOfInterest/PointOfInterestList";

type Props = {
  plan: Entities.Plan;
};
export default function PlanDetail({ plan }: Props) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[90vh]">
        <img
          src={plan.pictureUrl}
          alt={plan.title ?? `Plan for scenario ${plan.title}`}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ScrollArea className="h-[90vh] px-2">
          <PointOfInterestList data={plan.pointsOfInterest} />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
