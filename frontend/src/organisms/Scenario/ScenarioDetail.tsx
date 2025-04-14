import Markdown from "@/atoms/Markdown";
import { Input } from "@/lib/shadcn/generated/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/shadcn/generated/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import type { Q } from "@/types/queries";
import { type FormEvent, useState } from "react";
import FlashcardList from "../Flashcard/FlashcardList";
import PlanDetail from "../Plan/PlanDetail";

type Props = {
  scenario: Q.Scenario;
};
export default function ScenarioDetail({ scenario }: Props) {
  const [needle, setNeedle] = useState<string>("");
  const [currPlan, setCurrPlan] = useState<Q.ScenarioPlan>(scenario.plans[0]);
  const hChangeCardNeedle = (evt: FormEvent<HTMLInputElement>) => {
    setNeedle(evt.currentTarget.value);
  };
  const hChangePlan = (evt: string) => {
    const newPlan = scenario.plans.find((plan) => plan.id === evt);
    if (newPlan) setCurrPlan(newPlan);
  };
  return (
    <>
      <h2>{scenario.title}</h2>
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="flashcards">FlashCards</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <Markdown value={scenario.fullStory} />
        </TabsContent>
        <TabsContent value="plans">
          {currPlan && (
            <>
              <Select onValueChange={hChangePlan}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={currPlan.title} />
                </SelectTrigger>
                <SelectContent>
                  {scenario.plans.map((plan) => (
                    <SelectItem value={plan.id} key={plan.id}>
                      {plan.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <PlanDetail plan={currPlan} />
            </>
          )}
        </TabsContent>
        <TabsContent value="flashcards">
          <Input
            type="search"
            placeholder="Search specific card..."
            onChange={hChangeCardNeedle}
            className="w-[180px]"
          />
          <FlashcardList
            data={scenario.flashcards.filter((fcard) =>
              fcard.title.toLowerCase().includes(needle.toLowerCase())
            )}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
