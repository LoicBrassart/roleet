import type { z } from "zod";
import EditableMarkdown from "@/atoms/EditableMarkdown";
import { useUpdateScenarioMutation } from "@/lib/graphql/generated/graphql-types";
import { triggerCustomEvent } from "@/lib/hooks/useEventListener";
import { scenarioSchema } from "@/lib/zod/scenario";
import type { Entities } from "@/types/entities";
import { Button } from "../../atoms/Button";
import { Form } from "../../atoms/Form";

type Props = {
  scenario: Entities.Scenario;
  formCompId?: string;
};
export default function FullStoryForm({ scenario, formCompId }: Props) {
  const [updateScenario] = useUpdateScenarioMutation();

  const hSubmitScenario = async (values: z.input<typeof scenarioSchema>) => {
    if (scenario) {
      await updateScenario({
        variables: { data: values, id: scenario.id },
      });
    }
    if (formCompId) {
      triggerCustomEvent("FormWrapper-submit-child", { uuid: formCompId });
    }
  };

  return (
    <Form
      onSubmit={hSubmitScenario}
      schema={scenarioSchema}
      defaultValues={scenario}
      className="space-y-6"
    >
      {({ register }) => (
        <>
          <EditableMarkdown
            source={scenario.fullStory}
            {...register("fullStory")}
          />
          <Button type="submit">Sauvegarder</Button>
        </>
      )}
    </Form>
  );
}
