import {
  type Scenario,
  useCreateScenarioMutation,
} from "@/lib/graphql/generated/graphql-types";
import { Form } from "@/lib/shadcn/generated/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../atoms/Button";
import { EditableField } from "../../atoms/EditableField";

type Props = {
  scenario?: Scenario;
};
export default function ScenarioFormCreate({ scenario }: Props) {
  const [createScenario] = useCreateScenarioMutation();
  const navigate = useNavigate();

  const scenarioSchema = z.object({
    title: z
      .string()
      .min(4, {
        message: "doit contenir au moins 4 caractères.",
      })
      .max(64, {
        message: "doit contenir au maximum 64 caractères.",
      }),
    teaser: z
      .string()
      .min(32, {
        message: "doit contenir au moins 32 caractères.",
      })
      .max(256, {
        message: "doit contenir au maximum 64 caractères.",
      }),
    fullStory: z.string().min(64, {
      message: "doit contenir au moins 64 caractères.",
    }),
    bannerUrl: z.string().max(256, {
      message: "doit contenir au maximum 256 caractères.",
    }),
    credits: z
      .string()
      .min(4, {
        message: "doit contenir au moins 4 caractères.",
      })
      .max(256, {
        message: "doit contenir au maximum 256 caractères.",
      }),
  });

  const form = useForm({
    resolver: zodResolver(scenarioSchema),
    defaultValues: {
      title: scenario ? scenario.title : "",
      bannerUrl: scenario ? scenario.bannerUrl : "",
      teaser: scenario ? scenario.teaser : "",
      fullStory: scenario ? scenario.fullStory : "",
      credits: scenario ? scenario.credits : "",
    },
  });

  const hUpdateScenario = async (values: z.input<typeof scenarioSchema>) => {
    const { data } = await createScenario({ variables: { data: values } });
    if (!data) return;
    const scenId = data.createScenario.id;
    navigate(`/scenario/${scenId}`);
  };

  // TODO Fix bannerUrl
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(hUpdateScenario)} className="space-y-6">
        <EditableField label="Titre" name="title" control={form.control} />
        <EditableField
          label="Bannière"
          name="bannerUrl"
          control={form.control}
        />
        <EditableField label="Teaser" name="teaser" control={form.control} />
        <EditableField
          label="Histoire"
          name="fullStory"
          control={form.control}
        />
        <EditableField label="Credits" name="credits" control={form.control} />
        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
