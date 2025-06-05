import { useSignupMutation } from "@/lib/graphql/generated/graphql-types";
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
import { currentUserSchema } from "@/lib/zod/auth";
import { useLogin } from "@/lib/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignupForm() {
  const [signup] = useSignupMutation();
  const setUserToStore = useLogin();

  const formSchema = z.object({
    name: z
      .string()
      .min(4, {
        message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
      })
      .max(64, {
        message: "Le nom d'utilisateur doit contenir au maximum 64 caractères.",
      }),
    password: z
      .string()
      .min(4, {
        message: "Le mot de passe doit contenir au moins 2 caractères.",
      })
      .max(64, {
        message: "Le mot de passe doit contenir au maximum 64 caractères.",
      }),
    mail: z
      .string()
      .min(4, {
        message: "L'email doit contenir au moins 2 caractères.",
      })
      .max(64, {
        message: "L'email doit contenir au maximum 64 caractères.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      mail: "",
    },
  });

  async function hSignup(values: z.infer<typeof formSchema>) {
    const { data } = await signup({
      variables: { data: values },
    });

    if (!data) return;
    const profile = currentUserSchema.parse(JSON.parse(data.signup));
    setUserToStore(profile);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(hSignup)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Le nom qui sera utilisé sur votre profil public.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Ne sera utilisée que pour vous transmettre vos notifications et
                valider votre inscription.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Votre password, doit être composé de 2-64 caractères
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">S'inscrire</Button>
      </form>
    </Form>
  );
}
