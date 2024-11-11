import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/shadcn/ui/tabs";
import type { Scenario } from "../lib/graphql/generated/graphql-types";
import FlashcardList from "./FlashcardList";
import PlanDetail from "./PlanDetail";
import { type FormEvent, useState } from "react";
import { Input } from "@/lib/shadcn/ui/input";

type Props = {
  data: Scenario;
};
export default function ScenarioDetail({ data }: Props) {
  const [needle, setNeedle] = useState<string>("");
  const hChange = (evt: FormEvent<HTMLInputElement>) => {
    setNeedle(evt.currentTarget.value);
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
          <PlanDetail data={data.plans[0]} />
        </TabsContent>
        <TabsContent value="flashcards">
          <Input
            type="search"
            placeholder="Search specific card..."
            onChange={hChange}
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
