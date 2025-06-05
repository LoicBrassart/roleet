import {
  useCreateScenarioMutation,
  useUpdateScenarioMutation,
} from "@/lib/graphql/generated/graphql-types";
import { Form } from "@/lib/shadcn/generated/ui/form";
import { scenarioSchema } from "@/lib/zod/scenario";
import { useCurrentUser, useUnsealScenario } from "@/lib/zustand/userStore";
import type { Entities } from "@/types/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { Button } from "../../atoms/Button";
import { EditableField } from "../../atoms/EditableField";

type Props = {
  scenario?: Entities.Scenario;
};
export default function ScenarioForm({ scenario }: Props) {
  const [createScenario] = useCreateScenarioMutation();
  const [updateScenario] = useUpdateScenarioMutation();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const unseal = useUnsealScenario();

  const form = useForm({
    resolver: zodResolver(scenarioSchema),
    defaultValues: {
      title: scenario?.title ?? "",
      bannerUrl: scenario?.bannerUrl ?? "",
      teaser: scenario?.teaser ?? "",
      fullStory: scenario?.fullStory ?? "",
      credits: scenario?.credits ?? "",
    },
  });
  const { register, handleSubmit } = form;

  const hSubmitScenario = async (values: z.input<typeof scenarioSchema>) => {
    let scenId: string;
    if (scenario) {
      const { data } = await updateScenario({
        variables: { data: values, id: scenario.id },
      });
      if (!data) return;
      scenId = data.updateScenario.id;
    } else {
      const { data } = await createScenario({ variables: { data: values } });
      if (!data) return;
      scenId = data.createScenario.id;

      currentUser?.readScenarios.push(scenId);
      unseal(scenId);
      navigate(`/scenario/${scenId}`);
    }
  };

  // TODO Fix bannerUrl
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(hSubmitScenario)} className="space-y-6">
        <EditableField label="Titre" {...register("title")} />
        <EditableField label="Bannière" {...register("bannerUrl")} />
        <EditableField label="Teaser" {...register("teaser")} />
        <EditableField label="Histoire" {...register("fullStory")} />
        <EditableField label="Credits" {...register("credits")} />
        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
