import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from "@/lib/graphql/generated/graphql-types";
import { Form } from "@/lib/shadcn/generated/ui/form";
import { planSchema } from "@/lib/zod/plan";
import type { Entities } from "@/types/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../../atoms/Button";
import { EditableField } from "../../atoms/EditableField";

type Scenario = Entities.Scenario;
type Props = {
  scenario: Scenario;
  plan?: Scenario["plans"][number];
};
export default function PlanForm({ scenario, plan }: Props) {
  const [createPlan] = useCreatePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();
  const form = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: plan?.title ?? "",
      description: plan?.description ?? "",
      pictureUrl: plan?.pictureUrl ?? "",
    },
  });
  const { register, handleSubmit } = form;

  const hSubmitPlan = async (values: z.input<typeof planSchema>) => {
    if (plan) {
      await updatePlan({ variables: { data: values, id: plan.id } });
    } else {
      await createPlan({
        variables: { data: { ...values, scenarioId: scenario.id } },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(hSubmitPlan)} className="space-y-6">
        <EditableField label="Titre" {...register("title")} />
        <EditableField label="Description" {...register("description")} />
        <EditableField label="Image" {...register("pictureUrl")} />
        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
