import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from "@/lib/graphql/generated/graphql-types";
import { planSchema } from "@/lib/zod/plan";
import type { Entities } from "@/types/entities";
import type { z } from "zod";
import { Button } from "../../atoms/Button";
import { EditableField } from "../../atoms/EditableField";
import { Form } from "../../atoms/Form";

type Scenario = Entities.Scenario;
type Props = {
  scenario: Scenario;
  plan?: Scenario["plans"][number];
};
export default function PlanForm({ scenario, plan }: Props) {
  const [createPlan] = useCreatePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();

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
    <Form
      onSubmit={hSubmitPlan}
      schema={planSchema}
      defaultValues={scenario}
      className="space-y-6"
    >
      {({ register }) => (
        <>
          <EditableField label="Titre" {...register("title")} />
          <EditableField label="Description" {...register("description")} />
          <EditableField label="Image" {...register("pictureUrl")} />
          <Button type="submit">Sauvegarder</Button>
        </>
      )}
    </Form>
  );
}
