import { Outlet } from "react-router";
import { useLogoutMutation } from "@/lib/graphql/generated/graphql-types";
import { useLogout } from "@/lib/zustand/userStore";

export default function Layout() {
  const [logout] = useLogoutMutation();
  const logoutFromStore = useLogout();

  const hLogout = () => {
    logout();
    logoutFromStore();
  };

  return (
    <>
      <main className="w-dvw overflow-x-hidden p-4">
        <Outlet />
      </main>
      <footer>
        <h2>DEBUG ZONE</h2>
        <button type="button" onClick={hLogout}>
          Logout
        </button>
      </footer>
    </>
  );
}
