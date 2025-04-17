import { Button } from "@/atoms/Button";
import { EditableField } from "@/atoms/EditableField";
import { Select } from "@/atoms/Select";
import {
  useCreateCampaignMutation,
  useGetAllUsersQuery,
  useGetMyScenariosQuery,
} from "@/lib/graphql/generated/graphql-types";
import { getOptions } from "@/lib/helpers/forms";
import {
  type CreateCampainOutput,
  createCampaignSchema,
} from "@/lib/schemas/campaignCreate";
import { updateCampaignSchema } from "@/lib/schemas/campaignUpdate";
import type { Option } from "@/lib/schemas/formOptions";
import { Form } from "@/lib/shadcn/generated/ui/form";
import type { Q } from "@/types/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {
  campaign?: Q.MyCampaign;
};
export default function CampaignForm({ campaign }: Props) {
  const [createCampaign] = useCreateCampaignMutation();
  // const [updateCampaign] = useUpdateCampaignMutation();
  const navigate = useNavigate();
  const stateForm = campaign?.id ? "update" : "create";

  const { data: scenData } = useGetMyScenariosQuery();
  const { data: usersData } = useGetAllUsersQuery();

  let defaultPlayers: Option[] = [];
  let defaultScenarios: Option[] = [];
  if (campaign) {
    defaultPlayers = getOptions(campaign.players, "id", "name");
    defaultScenarios = getOptions(campaign.scenarios, "id", "title");
  }

  const form = useForm({
    resolver: zodResolver(
      stateForm === "create" ? createCampaignSchema : updateCampaignSchema,
    ),
    defaultValues: {
      title: campaign?.title ?? "",
      bannerUrl: campaign?.bannerUrl ?? "",
      players: defaultPlayers as unknown as string[],
      scenarios: defaultScenarios as unknown as string[],
    },
  });

  const { handleSubmit, register } = form;

  // TODO: Fix bannerUrl : mandatory or optional ?
  const onSubmit: SubmitHandler<CreateCampainOutput> = async (values) => {
    if (campaign?.id) {
      // const updated = await updateCampaign({
      //   variables: { id: campaign.id, data: values },
      // });
      // navigate(`/campaign/${campId}`);
      return;
    }

    const { data } = await createCampaign({ variables: { data: values } });
    if (!data) return;
    const campId = data.createCampaign.id;
    navigate(`/campaign/${campId}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <EditableField label="Titre" {...register("title")} />

        <EditableField label="Bannière" {...register("bannerUrl")} />

        {usersData && (
          <Select
            label="Joueurs"
            description="les joueurs que vous souhaitez voir venir sur cette tablée"
            isMulti
            options={getOptions(usersData.getAllUsers, "id", "name")}
            {...register("players")}
          />
        )}

        {scenData && (
          <Select
            label="scenarios"
            description="les scenarios que vous voulez offrir à vos joueurs"
            isMulti
            options={getOptions(scenData.getMyScenarios, "id", "title")}
            {...register("scenarios")}
          />
        )}

        <Button type="submit">Sauvegarder</Button>
      </form>
    </Form>
  );
}
