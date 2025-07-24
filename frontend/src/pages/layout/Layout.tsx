import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main className="m-auto mt-0 w-8/12">
      <Outlet />
    </main>
  );
}
