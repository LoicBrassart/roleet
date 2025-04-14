import { useLoginMutation } from "@/lib/graphql/generated/graphql-types";
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
import { useUserStore } from "@/lib/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
  const [login] = useLoginMutation();
  const setUserToStore = useUserStore((state) => state.login);

  const hLogin = async (values: z.infer<typeof userSchema>) => {
    const { data } = await login({
      variables: { data: values },
    });

    if (!data) return;
    const profile = JSON.parse(data.login);
    setUserToStore(profile);
  };

  const userSchema = z.object({
    mail: z
      .string()
      .min(4, {
        message: "L'adresse mail doit contenir au moins 2 caractères.",
      })
      .max(64, {
        message: "L'adresse mail doit contenir au maximum 64 caractères.",
      }),
    password: z
      .string()
      .min(4, {
        message: "Le mot de passe doit contenir au moins 2 caractères.",
      })
      .max(64, {
        message: "Le mot de passe doit contenir au maximum 64 caractères.",
      }),
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(hLogin)} className="w-2/3 space-y-6">
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
                Ne sera jamais affichée aux autres utilisateurs
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
        <Button type="submit">Se connecter</Button>
      </form>
    </Form>
  );
}
