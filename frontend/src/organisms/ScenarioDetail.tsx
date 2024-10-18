import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/shadcn/ui/tabs";
import type { Scenario } from "../lib/graphql/generated/graphql-types";

type Props = {
  data: Scenario;
};
export default function ScenarioDetail({ data }: Props) {
  return (
    <>
      <h2>{data.title}</h2>
      <p>More coming Soon(tm)</p>
      <Tabs defaultValue="home" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="flashcards">FlashCards</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <p>Home</p>
        </TabsContent>
        <TabsContent value="plans">
          <p>Plans</p>
        </TabsContent>
        <TabsContent value="flashcards">
          <p>FlashCards</p>
        </TabsContent>
      </Tabs>
    </>
  );
}
