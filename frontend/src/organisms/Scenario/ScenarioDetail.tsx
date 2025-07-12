import { AnimatedTabs, type Tab } from "@/atoms/AnimatedTabs";
import { Button } from "@/atoms/Button";
import EditableMarkdown from "@/atoms/EditableMarkdown";
import FormWrapper from "@/atoms/FormWrapper";
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
  useIsScenarioLocked,
  useSetLockedScenario,
} from "@/lib/zustand/adminScenarioStore";
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
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.id === scenario.owner.id;

  return (
    <>
      <h2>{scenario.title}</h2>
      <div className="flex">
        <AnimatedTabs
          className="h-auto min-h-full"
          tabs={
            [
              {
                label: "Home",
                value: "home",
                component: <TabHome scenario={scenario} />,
              },
              {
                label: "Plans",
                value: "plans",
                component: <TabPlans scenario={scenario} />,
              },
              {
                label: "FlashCards",
                value: "flashcards",
                component: <TabFlashcards scenario={scenario} />,
              },
              isOwner && {
                label: "Actions",
                value: "danger-zone",
                component: <TabActions scenarioId={scenario.id} />,
              },
            ].filter(Boolean) as [Tab, ...Tab[]]
          }
          defaultTabValue=""
        />
      </div>
    </>
  );
}

function TabHome({
  scenario,
}: {
  scenario: Entities.Scenario;
}) {
  const isLocked = useIsScenarioLocked(scenario.id);

  return (
    <FormWrapper
      baseComp={<Markdown value={scenario.fullStory} />}
      formComp={<EditableMarkdown source={scenario.fullStory} />}
      locked={isLocked}
    />
  );
}

function TabPlans({
  scenario,
}: {
  scenario: Entities.Scenario;
}) {
  const [currPlan, setCurrPlan] = useState<Entities.Plan>(scenario.plans[0]);

  const hChangePlan = (evt: string) => {
    const newPlan = scenario.plans.find((plan) => plan.id === evt);
    if (newPlan) setCurrPlan(newPlan);
  };

  return (
    <>
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
    </>
  );
}

function TabFlashcards({
  scenario,
}: {
  scenario: Entities.Scenario;
}) {
  const [needle, setNeedle] = useState<string>("");
  const isLocked = useIsScenarioLocked(scenario.id);

  const hChangeCardNeedle = (evt: FormEvent<HTMLInputElement>) => {
    setNeedle(evt.currentTarget.value);
  };

  return (
    <>
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
        locked={isLocked}
      />
    </>
  );
}

function TabActions({
  scenarioId,
}: {
  scenarioId: string;
}) {
  const isLocked = useIsScenarioLocked(scenarioId);
  const setLocked = useSetLockedScenario();
  const navigate = useNavigate();

  const [deleteScenario] = useDeleteScenarioMutation();
  const hDeleteScenario = async () => {
    const { errors } = await deleteScenario({
      variables: { deleteScenarioId: scenarioId },
    });
    if (!errors) {
      navigate("/scenarios");
    }
  };

  return (
    <>
      <h2>Actions</h2>
      <Button variant="destructive" onClick={hDeleteScenario}>
        Delete
      </Button>
      <Button onClick={() => setLocked(scenarioId, !isLocked)}>
        {isLocked ? "Unlock" : "Relock"}
      </Button>
    </>
  );
}
