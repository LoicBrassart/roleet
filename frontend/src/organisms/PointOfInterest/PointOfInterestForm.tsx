import {
  useCreatePointOfInterestMutation,
  useUpdatePointOfInterestMutation,
} from "@/lib/graphql/generated/graphql-types";
import { Form } from "@/lib/shadcn/generated/ui/form";
import { poiSchema } from "@/lib/zod/poi";
import type { Q } from "@/types/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../../atoms/Button";
import { EditableField } from "../../atoms/EditableField";

type Plan = Q.Scenario["plans"][number];
type Props = {
  plan: Plan;
  poi?: Plan["pointsOfInterest"][number];
};
export default function PointOfInterestForm({ plan, poi }: Props) {
  const [createPoI] = useCreatePointOfInterestMutation();
  const [updatePoI] = useUpdatePointOfInterestMutation();
  const form = useForm({
    resolver: zodResolver(poiSchema),
    defaultValues: {
      code: poi?.code ?? "",
      title: poi?.title ?? "",
      description: poi?.description ?? "",
      planId: plan.id,
    },
  });
  const { register, handleSubmit } = form;

  const hSubmitPoI = async (values: z.input<typeof poiSchema>) => {
    if (poi) {
      await updatePoI({ variables: { data: values, id: poi.id } });
    } else {
      await createPoI({ variables: { data: values } });
    }
  };

  // TODO Fix bannerUrl
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(hSubmitPoI)} className="space-y-6">
        <EditableField label="Code" {...register("code")} />
        <EditableField label="Titre" {...register("title")} />
        <EditableField label="Description" {...register("description")} />
        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
