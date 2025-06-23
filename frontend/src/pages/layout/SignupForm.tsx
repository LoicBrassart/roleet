import { useSignupMutation } from "@/lib/graphql/generated/graphql-types";
import { Button } from "@/lib/shadcn/generated/ui/button";
import { currentUserSchema, signupSchema } from "@/lib/zod/auth";
import { useLogin } from "@/lib/zustand/userStore";
import type { z } from "zod";
import { EditableField } from "../../atoms/EditableField";
import { Form } from "../../atoms/Form";

export default function SignupForm() {
  const [signup] = useSignupMutation();
  const setUserToStore = useLogin();

  const defaultSignup = {
    name: "",
    password: "",
    mail: "",
  };

  async function hSignup(values: z.infer<typeof signupSchema>) {
    const { data } = await signup({
      variables: { data: values },
    });

    if (!data) return;
    const profile = currentUserSchema.parse(JSON.parse(data.signup));
    setUserToStore(profile);
  }
  return (
    <Form
      onSubmit={hSignup}
      schema={signupSchema}
      defaultValues={defaultSignup}
      className="w-2/3 space-y-6"
    >
      {({ register }) => (
        <>
          <EditableField label="Nom d'utilisateur" {...register("name")} />
          <EditableField label="Adresse email" {...register("mail")} />
          <EditableField label="Password" {...register("password")} />
          <Button type="submit">S'inscrire</Button>
        </>
      )}
    </Form>
  );
}
