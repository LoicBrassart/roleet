import { Button } from "@/atoms/Button";
import { EditableField } from "@/atoms/EditableField";
import { FormMessage } from "@/atoms/FormMessage";
import { Select } from "@/atoms/Select";
import {
  type Campaign,
  useCreateCampaignMutation,
  useGetAllUsersQuery,
  useGetMyScenariosQuery,
} from "@/lib/graphql/generated/graphql-types";
import { getOptions } from "@/lib/helpers/forms";
import { type Option, formOptionsSchema } from "@/lib/helpers/zodSchemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/lib/shadcn/generated/ui/form";
import { useUserStore } from "@/lib/zustand/userStore";
import type { Q } from "@/types/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type Props = {
  campaign?: Q.MyCampaign;
};
export default function CampaignForm({ campaign }: Props) {
  const user = useUserStore((state) => state.user);
  const [createCampaign] = useCreateCampaignMutation();
  const navigate = useNavigate();

  if (!user) return <p>User not found</p>;

  let defaultPlayers: Option[] = [];
  let defaultScenarios: Option[] = [];
  if (campaign) {
    defaultPlayers = getOptions(campaign.players, "id", "name");
    defaultScenarios = getOptions(campaign.scenarios, "id", "title");
  }

  const campaignSchema = z.object({
    title: z
      .string()
      .min(4, {
        message: "doit contenir au moins 4 caractères.",
      })
      .max(64, {
        message: "doit contenir au maximum 64 caractères.",
      }),
    bannerUrl: z
      .string()
      .min(4, {
        message: "doit contenir au moins 4 caractères.",
      })
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
      title: campaign?.title ?? "",
      bannerUrl: campaign?.bannerUrl ?? "",
      players: defaultPlayers,
      scenarios: defaultScenarios,
    },
  });

  // TODO: Fix bannerUrl : mandatory or optional ?
  const hUpdateCampaign = async (values: z.input<typeof campaignSchema>) => {
    const { data } = await createCampaign({ variables: { data: values } });
    if (!data) return;
    const campId = data.createCampaign.id;
    navigate(`/campaign/${campId}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(hUpdateCampaign)} className="space-y-6">
        <EditableField label="Titre" name="title" control={form.control} />
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
