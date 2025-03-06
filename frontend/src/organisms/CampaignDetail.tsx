import {
  type Campaign,
  useGetAllUsersQuery,
  useGetMyScenariosQuery,
} from "@/lib/graphql/generated/graphql-types";
import { getOptions } from "@/lib/helpers/forms";
import { formOptionsSchema } from "@/lib/helpers/zodSchemas";
import { Button } from "@/lib/shadcn/generated/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/shadcn/generated/ui/form";
import { Input } from "@/lib/shadcn/generated/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";

type Props = {
  data: Campaign;
};
export default function CampaignDetail({ data }: Props) {
  const { data: usersData } = useGetAllUsersQuery();
  const { data: scenData } = useGetMyScenariosQuery();

  const defaultPlayers = getOptions(data.players, "id", "name");
  const defaultScenarios = getOptions(data.scenarios, "id", "title");

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

  const form = useForm<z.input<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: data.title,
      bannerUrl: data.bannerUrl,
      // ???? Ca devrait pas plutot etre là les defaults ?
      // players: defaultPlayers,
      // scenarios: defaultScenarios,
    },
  });

  const hUpdateCampaign = async (values: z.input<typeof campaignSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(hUpdateCampaign)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  sera affichée aux autres utilisateurs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <li>Meneur: {data.storyteller.name}</li>

          <FormField
            control={form.control}
            name="bannerUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bannière</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  servira à décorer le cartouche de votre campagne
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="players"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Joueurs</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={usersData?.getAllUsers.map((user) => ({
                      value: user.id,
                      label: user.name,
                    }))}
                    defaultValue={defaultPlayers}
                    isMulti
                    delimiter=","
                  />
                </FormControl>
                <FormDescription>
                  les joueurs que vous souhaitez voir venir sur cette tablée
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scenarios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scenarios</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={scenData?.getMyScenarios.map((scenario) => ({
                      value: scenario.id,
                      label: scenario.title,
                    }))}
                    defaultValue={defaultScenarios}
                    isMulti
                    delimiter=","
                  />
                </FormControl>
                <FormDescription>
                  les scenarios que vous voulez offrir à vos joueurs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sauvegarder</Button>
        </form>
      </Form>
    </>
  );
}
