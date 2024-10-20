import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/shadcn/ui/tabs";
import type { Scenario } from "../lib/graphql/generated/graphql-types";
import FlashcardList from "./FlashcardList";
import PlanDetail from "./PlanDetail";

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
          <p>{data.fullStory}</p>
        </TabsContent>
        <TabsContent value="plans">
          <PlanDetail data={data.plans[0]} />
        </TabsContent>
        <TabsContent value="flashcards">
          <FlashcardList data={data.flashcards} title="Flashcards" />
        </TabsContent>
      </Tabs>
    </>
  );
}
