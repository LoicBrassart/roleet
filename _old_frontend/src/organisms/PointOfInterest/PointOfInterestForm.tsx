import type { z } from "zod";
import {
  useCreatePointOfInterestMutation,
  useUpdatePointOfInterestMutation,
} from "@/lib/graphql/generated/graphql-types";
import { poiSchema } from "@/lib/zod/poi";
import type { Entities } from "@/types/entities";
import { Button } from "../../atoms/Button";
import { EditableField } from "../../atoms/EditableField";
import { Form } from "../../atoms/Form";

type Props = {
  plan: Entities.Plan;
  poi?: Entities.PoI;
};
// TODO: add poi owner ? Maybe not, should be dynamically generated in backend
export default function PointOfInterestForm({ plan, poi }: Props) {
  const [createPoI] = useCreatePointOfInterestMutation();
  const [updatePoI] = useUpdatePointOfInterestMutation();

  const hSubmitPoI = async (values: z.input<typeof poiSchema>) => {
    if (poi) {
      await updatePoI({ variables: { data: values, id: poi.id } });
    } else {
      await createPoI({ variables: { data: values } });
    }
  };

  return (
    <Form
      onSubmit={hSubmitPoI}
      schema={poiSchema}
      defaultValues={{ ...poi, planId: plan.id }}
      className="space-y-6"
    >
      {({ register }) => (
        <>
          <EditableField label="Code" {...register("code")} />
          <EditableField label="Titre" {...register("title")} />
          <EditableField label="Description" {...register("description")} />
          <Button type="submit">Sauvegarder</Button>
        </>
      )}
    </Form>
  );
}
