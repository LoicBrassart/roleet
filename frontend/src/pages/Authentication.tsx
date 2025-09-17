import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import LoginForm from "@/organisms/user/LoginForm";
import SignupForm from "@/organisms/user/SignupForm";

export default function Authentication() {
  // const currentUser = useCurrentUser();
  // const navigate = useNavigate();

  // if (currentUser) navigate("/");

  return (
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
  );
}
