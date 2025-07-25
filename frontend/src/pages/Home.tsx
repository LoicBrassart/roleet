import { useCurrentUser } from "@/lib/zustand/userStore";
import Authentication from "./Authentication";
import Dashboard from "./Dashboard";

export default function Home() {
  const user = useCurrentUser();
  if (!user) return <Authentication />;
  return <Dashboard />;
}
