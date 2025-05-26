import LoginForm from "@/layout/LoginForm";
import SignupForm from "@/layout/SignupForm";
import { useLogoutMutation } from "@/lib/graphql/generated/graphql-types";
import { Button } from "@/lib/shadcn/generated/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import { useCurrentUser, useLogout } from "@/lib/zustand/userStore";

export default function AuthenticationPage() {
  const currentUser = useCurrentUser();
  const [logout] = useLogoutMutation();
  const unsetUserToStore = useLogout();

  const hLogout = () => {
    logout();
    unsetUserToStore();
  };

  if (currentUser?.name)
    return (
      <>
        <p>You're logged in as {currentUser.name}</p>
        <pre>{JSON.stringify(currentUser, null, 4)}</pre>
        <Button type="submit" onClick={hLogout}>
          Se déconnecter
        </Button>
      </>
    );

  return (
    <>
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Se connecter</TabsTrigger>
          <TabsTrigger value="signup">S'inscrire</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </>
  );
}
