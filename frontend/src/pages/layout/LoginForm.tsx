import { useLoginMutation } from "@/lib/graphql/generated/graphql-types";
import { Button } from "@/lib/shadcn/generated/ui/button";
import { currentUserSchema, loginSchema } from "@/lib/zod/auth";
import { useLogin } from "@/lib/zustand/userStore";
import type { z } from "zod";
import { EditableField } from "../../atoms/EditableField";
import { Form } from "../../atoms/Form";

export default function LoginForm() {
  const [login] = useLoginMutation();
  const setUserToStore = useLogin();

  const hLogin = async (values: z.infer<typeof loginSchema>) => {
    const { data } = await login({
      variables: { data: values },
    });

    if (!data) return;
    const profile = currentUserSchema.parse(data.login);
    setUserToStore(profile);
  };

  const defaultLogin = {
    mail: "",
    password: "",
  };

  return (
    <Form
      onSubmit={hLogin}
      schema={loginSchema}
      defaultValues={defaultLogin}
      className="w-2/3 space-y-6"
    >
      {({ register }) => (
        <>
          <EditableField label="Adresse email" {...register("mail")} />
          <EditableField label="Password" {...register("password")} />
          <Button type="submit">Se connecter</Button>
        </>
      )}
    </Form>
  );
}
