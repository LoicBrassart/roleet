import { Button } from "@/atoms/Button";
import EditableMarkdown from "@/atoms/EditableMarkdown";
import Markdown from "@/atoms/Markdown";
import { useDeleteScenarioMutation } from "@/lib/graphql/generated/graphql-types";
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
import { useCurrentUser } from "@/lib/zustand/userStore";
import type { Entities } from "@/types/entities";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashcardList from "../Flashcard/FlashcardList";
import PlanDetail from "../Plan/PlanDetail";

type Props = {
  scenario: Entities.Scenario;
};
export default function ScenarioDetail({ scenario }: Props) {
  const [needle, setNeedle] = useState<string>("");
  const [currPlan, setCurrPlan] = useState<Entities.Plan>(scenario.plans[0]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const currentUser = useCurrentUser();
  const [deleteScenario] = useDeleteScenarioMutation();
  const navigate = useNavigate();

  const hChangeCardNeedle = (evt: FormEvent<HTMLInputElement>) => {
    setNeedle(evt.currentTarget.value);
  };
  const hChangePlan = (evt: string) => {
    const newPlan = scenario.plans.find((plan) => plan.id === evt);
    if (newPlan) setCurrPlan(newPlan);
  };
  const hDeleteScenario = async () => {
    const { errors } = await deleteScenario({
      variables: { deleteScenarioId: scenario.id },
    });
    if (!errors) {
      navigate("/scenarios");
    }
  };
  const hEnterEditMode = async () => {
    setIsEditing(true);
  };

  const hCancelEditMode = async () => {
    setIsEditing(false);
  };
  const hUpdateScenario = async () => {
    console.log("TODO!");
    setIsEditing(false);
    // TODO: implement
  };

  return (
    <>
      <h2>{scenario.title}</h2>
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="flashcards">FlashCards</TabsTrigger>
          {currentUser?.id === scenario.owner.id && (
            <TabsTrigger value="actions">🛞 Actions</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="home">
          {isEditing ? (
            <EditableMarkdown source={scenario.fullStory} />
          ) : (
            <Markdown value={scenario.fullStory} />
          )}
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
              fcard.title.toLowerCase().includes(needle.toLowerCase()),
            )}
            isEditing={isEditing}
          />
        </TabsContent>
        {currentUser?.id === scenario.owner.id && (
          <TabsContent value="actions">
            <h2>Actions</h2>
            {/* TODO: Fix backend (delete cascades)  */}
            <Button variant={"destructive"} onClick={hDeleteScenario}>
              Delete
            </Button>
            {!isEditing ? (
              <Button variant={"secondary"} onClick={hEnterEditMode}>
                Edit
              </Button>
            ) : (
              <>
                <Button type="reset" onClick={hCancelEditMode}>
                  Cancel
                </Button>
                <Button type="button" onClick={hUpdateScenario}>
                  Confirm
                </Button>
              </>
            )}
          </TabsContent>
        )}
      </Tabs>
    </>
  );
}
