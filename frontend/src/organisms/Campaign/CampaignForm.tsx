import { Button } from "@/atoms/Button";
import { EditableField } from "@/atoms/EditableField";
import { Select } from "@/atoms/Select";
import {
  useCreateCampaignMutation,
  useGetAllUsersQuery,
  useGetMyScenariosQuery,
} from "@/lib/graphql/generated/graphql-types";
import { getOptions } from "@/lib/helpers/forms";
import type { Option } from "@/lib/helpers/zodSchemas";
import { Form } from "@/lib/shadcn/generated/ui/form";
import campaignSchema from "@/lib/zod/campaign";
import { useUserStore } from "@/lib/zustand/userStore";
import type { Entities } from "@/types/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";

type Props = {
  campaign?: Entities.Campaign;
};
export default function CampaignForm({ campaign }: Props) {
  const user = useUserStore((state) => state.user);
  const [createCampaign] = useCreateCampaignMutation();
  const navigate = useNavigate();
  const { data: scenData } = useGetMyScenariosQuery();
  const { data: usersData } = useGetAllUsersQuery();

  if (!user) return <p>User not found</p>;

  let defaultPlayers: Option[] = [];
  let defaultScenarios: Option[] = [];
  if (campaign) {
    defaultPlayers = getOptions(campaign.players, "id", "name");
    defaultScenarios = getOptions(campaign.scenarios, "id", "title");
  }

  const form = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: campaign?.title ?? "",
      bannerUrl: campaign?.bannerUrl ?? "",
      players: defaultPlayers as unknown as string[],
      scenarios: defaultScenarios as unknown as string[],
    },
  });
  const { handleSubmit, register } = form;

  // TODO: Fix bannerUrl : mandatory or optional ?
  const hUpdateCampaign = async (values: z.output<typeof campaignSchema>) => {
    const { data } = await createCampaign({ variables: { data: values } });
    if (!data) return;
    const campId = data.createCampaign.id;
    navigate(`/campaign/${campId}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(hUpdateCampaign)} className="space-y-6">
        <EditableField label="Titre" {...register("title")} />
        <EditableField label="Bannière" {...register("bannerUrl")} />
        {usersData && (
          <Select
            label="Joueurs"
            description="les joueurs que vous souhaitez voir venir sur cette tablée"
            isMulti
            options={usersData.getAllUsers.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            {...register("players")}
          />
        )}
        {scenData && (
          <Select
            label="Scenarios"
            description="les scenarios que vous voulez offrir à vos joueurs"
            isMulti
            options={scenData.getMyScenarios.map((scenario) => ({
              value: scenario.id,
              label: scenario.title,
            }))}
            {...register("scenarios")}
          />
        )}
        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
