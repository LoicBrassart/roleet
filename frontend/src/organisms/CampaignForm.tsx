import { FormMessage } from "@/atoms/FormMessage";
import {
  type Campaign,
  useGetAllUsersQuery,
  useGetMyScenariosQuery,
} from "@/lib/graphql/generated/graphql-types";
import { getOptions } from "@/lib/helpers/forms";
import { formOptionsSchema } from "@/lib/helpers/zodSchemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/lib/shadcn/generated/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerProps, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../atoms/Button";
import { Select } from "../atoms/Select";
import { EditableField } from "../molecules/EditableField";

type Props = {
  campaign: Campaign;
};
export default function CampaignForm({ campaign }: Props) {
  const defaultPlayers = getOptions(campaign.players, "id", "name");
  const defaultScenarios = getOptions(campaign.scenarios, "id", "title");

  const campaignSchema = z.object({
    title: z
      .string()
      .min(4, {
        message: "doit contenir au moins 2 caractères.",
      })
      .max(64, {
        message: "doit contenir au maximum 64 caractères.",
      }),
    bannerUrl: z
      .string()
      .max(256, {
        message: "doit contenir au maximum 256 caractères.",
      })
      .default(""),
    players: formOptionsSchema.default(defaultPlayers),
    scenarios: formOptionsSchema.default(defaultScenarios),
  });

  const { data: scenData } = useGetMyScenariosQuery();
  const { data: usersData } = useGetAllUsersQuery();

  const form = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: campaign.title,
      bannerUrl: campaign.bannerUrl,
      players: defaultPlayers,
      scenarios: defaultScenarios,
    },
  });

  const hUpdateCampaign = async (values: z.input<typeof campaignSchema>) =>
    console.log(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(hUpdateCampaign)} className="space-y-6">
        <EditableField
          label="Titre"
          name="title"
          control={form.control}
        />
        <EditableField
          label="Bannière"
          name="bannerUrl"
          control={form.control}
        />
        {usersData && (
          <FormField
            control={form.control}
            name="players"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Joueurs</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    label="Joueurs"
                    name="players"
                    control={form.control}
                    isMulti
                    options={usersData.getAllUsers.map((user) => ({
                      value: user.id,
                      label: user.name,
                    }))}
                    defaultValue={defaultPlayers}
                  />
                </FormControl>
                <FormDescription>
                  les joueurs que vous souhaitez voir venir sur cette tablée
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {scenData && (
          <FormField
            control={form.control}
            name="scenarios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scenarios</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    label="Scenarios"
                    name="scenarios"
                    control={form.control}
                    isMulti
                    options={scenData.getMyScenarios.map((scenario) => ({
                      value: scenario.id,
                      label: scenario.title,
                    }))}
                    defaultValue={defaultScenarios}
                  />
                </FormControl>
                <FormDescription>
                  les scenarios que vous voulez offrir à vos joueurs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
