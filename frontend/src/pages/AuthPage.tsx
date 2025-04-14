import { useLogoutMutation } from "@/lib/graphql/generated/graphql-types";
import { Button } from "@/lib/shadcn/generated/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import { useUserStore } from "@/lib/zustand/userStore";
import LoginForm from "@/organisms/LoginForm";
import SignupForm from "@/organisms/SignupForm";

export default function AuthPage() {
  const currentUser = useUserStore((state) => state.user);
  const [logout] = useLogoutMutation();
  const unsetUserToStore = useUserStore((state) => state.logout);

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
