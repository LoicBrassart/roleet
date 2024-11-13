import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/shadcn/ui/tabs";
import type { Plan, Scenario } from "../lib/graphql/generated/graphql-types";
import FlashcardList from "./FlashcardList";
import PlanDetail from "../molecules/PlanDetail";
import { type FormEvent, useState } from "react";
import { Input } from "@/lib/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/shadcn/ui/select";

type Props = {
  data: Scenario;
};
export default function ScenarioDetail({ data }: Props) {
  const [needle, setNeedle] = useState<string>("");
  const [currPlan, setCurrPlan] = useState<Plan>(data.plans[0]);
  const hChangeCardNeedle = (evt: FormEvent<HTMLInputElement>) => {
    setNeedle(evt.currentTarget.value);
  };
  const hChangePlan = (evt: string) => {
    const newPlan = data.plans.find((plan) => plan.id === evt);
    if (newPlan) setCurrPlan(newPlan);
  };
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
          <p>{data.fullStory}</p>
        </TabsContent>
        <TabsContent value="plans">
          <Select onValueChange={hChangePlan}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={currPlan.title} />
            </SelectTrigger>
            <SelectContent>
              {data.plans.map((plan) => (
                <SelectItem value={plan.id} key={plan.id}>
                  {plan.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <PlanDetail data={currPlan} />
        </TabsContent>
        <TabsContent value="flashcards">
          <Input
            type="search"
            placeholder="Search specific card..."
            onChange={hChangeCardNeedle}
            className="w-[180px]"
          />
          <FlashcardList
            data={data.flashcards.filter((fcard) =>
              fcard.title.toLowerCase().includes(needle.toLowerCase()),
            )}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
