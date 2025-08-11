import { Outlet, useNavigate } from "react-router";
import { useLogoutMutation } from "@/lib/graphql/generated/graphql-types";
import { useLogout } from "@/lib/zustand/userStore";

export default function Layout() {
  const [logout] = useLogoutMutation();
  const logoutFromStore = useLogout();
  const navigate = useNavigate();

  const hLogout = () => {
    logout();
    logoutFromStore();
    navigate("/");
  };

  return (
    <>
      <main className="mb-20 w-dvw overflow-x-hidden p-4">
        <Outlet />
      </main>
      <footer className="fixed right-0 bottom-0 left-0 bg-black/40 p-4">
        <h2>DEBUG ZONE</h2>
        <button type="button" onClick={hLogout}>
          Logout
        </button>
      </footer>
    </>
  );
}
