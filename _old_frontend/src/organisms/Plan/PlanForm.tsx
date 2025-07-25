import type { z } from "zod";
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from "@/lib/graphql/generated/graphql-types";
import { triggerCustomEvent } from "@/lib/hooks/useEventListener";
import { planSchema } from "@/lib/zod/plan";
import type { Entities } from "@/types/entities";
import { Button } from "../../atoms/Button";
import { EditableField } from "../../atoms/EditableField";
import { Form } from "../../atoms/Form";

type Props = {
  scenarioId: Entities.Scenario["id"];
  plan?: Entities.Plan;
  formCompId?: string;
};
export default function PlanForm({ plan, scenarioId, formCompId }: Props) {
  const [createPlan] = useCreatePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();

  const hSubmitPlan = async (values: z.input<typeof planSchema>) => {
    if (plan) {
      await updatePlan({ variables: { data: values, id: plan.id } });
    } else {
      await createPlan({
        variables: { data: { ...values, scenarioId: scenarioId } },
      });
    }
    if (formCompId) {
      triggerCustomEvent("FormWrapper-submit-child", { uuid: formCompId });
    }
  };

  return (
    <Form
      onSubmit={hSubmitPlan}
      schema={planSchema}
      defaultValues={plan}
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
