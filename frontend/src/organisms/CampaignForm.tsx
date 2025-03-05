import { useCreateCampaignMutation } from "@/lib/graphql/generated/graphql-types";
import { Button } from "@/lib/shadcn/generated/ui/button";
import { DialogClose } from "@/lib/shadcn/generated/ui/dialog";
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
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function CampaignForm() {
  const [createCampaign] = useCreateCampaignMutation();
  const navigate = useNavigate();
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
      .optional(),
    // TODO Add relations to the initial campaign, or add them afterwards ?
    // players
    // scenarios
  });

  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      bannerUrl: "",
    },
  });
  const hCreateCampaign = async (values: z.infer<typeof campaignSchema>) => {
    // const { data } = await login({
    //   variables: { data: values },
    // });
    // TODO Appeler la Mutation concernée
    const { data } = await createCampaign({
      variables: { data: values },
    });
    if (data?.createCampaign.id)
      navigate(`/campaign/${data?.createCampaign.id}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(hCreateCampaign)}
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
        <Button type="submit">Créer</Button>
        <DialogClose>Annuler</DialogClose>
      </form>
    </Form>
  );
}
