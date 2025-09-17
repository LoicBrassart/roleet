import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { Button } from "@/atoms/Button";
import { EditableField } from "@/atoms/EditableField";
import { Form } from "@/atoms/Form";
import { Select } from "@/atoms/Select";
import {
  useCreateCampaignMutation,
  useGetAllUsersQuery,
  useGetMyScenariosQuery,
} from "@/lib/graphql/generated/graphql-types";
import { getOptions } from "@/lib/helpers/forms";
import type { Option } from "@/lib/helpers/zodSchemas";
import campaignSchema from "@/lib/zod/campaign";
import { useCurrentUser } from "@/lib/zustand/userStore";
import type { Entities } from "@/types/entities";

type Props = {
  campaign?: Entities.Campaign;
};
export default function CampaignForm({ campaign }: Props) {
  const user = useCurrentUser();
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

  const defaultCampaign = {
    title: campaign?.title ?? "",
    bannerUrl: campaign?.bannerUrl ?? "",
    players: defaultPlayers,
    scenarios: defaultScenarios,
  };

  // TODO: Fix bannerUrl : mandatory or optional ?
  const hUpdateCampaign = async (values: z.output<typeof campaignSchema>) => {
    const formattedValues = {
      ...values,
      players: values.players.map((player) => player.value),
      scenarios: values.scenarios.map((scenario) => scenario.value),
    };
    const { data } = await createCampaign({
      variables: { data: formattedValues },
    });
    if (!data) return;
    const campId = data.createCampaign.id;
    navigate(`/campaign/${campId}`);
  };

  return (
    <Form
      onSubmit={hUpdateCampaign}
      schema={campaignSchema}
      defaultValues={defaultCampaign}
      className="space-y-6"
    >
      {({ register }) => (
        <>
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
        </>
      )}
    </Form>
  );
}
