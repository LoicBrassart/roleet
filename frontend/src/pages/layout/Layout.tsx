import { Link, Outlet, useNavigate } from "react-router";
import { useLogoutMutation } from "@/lib/graphql/generated/graphql-types";
import { useCurrentUser, useLogout } from "@/lib/zustand/userStore";

export default function Layout() {
  const [logout] = useLogoutMutation();
  const logoutFromStore = useLogout();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const hLogout = () => {
    logout();
    logoutFromStore();
    navigate("/");
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mb-20 w-dvw overflow-x-hidden p-4">
        <Outlet />
      </main>
      <footer className="fixed right-0 bottom-0 left-0 bg-black/40 p-4">
        <h2>DEBUG ZONE</h2>
        {user ? (
          <>
            <button type="button" onClick={hLogout}>
              Logout
            </button>
            {/* <div>
              <p>You're logged in as {user.name}</p>
              <pre>{JSON.stringify(user, null, 4)}</pre>
            </div> */}
          </>
        ) : (
          <Link to="/auth">Authentification</Link>
        )}
      </footer>
    </>
  );
}
