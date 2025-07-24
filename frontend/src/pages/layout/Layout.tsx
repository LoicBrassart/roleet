import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main className="p-4">
      <Outlet />
    </main>
  );
}
