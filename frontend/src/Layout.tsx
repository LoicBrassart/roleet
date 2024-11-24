import { Outlet } from "react-router-dom";
import "./globals.css";

export default function Layout() {
  return (
    <main className="w-8/12 m-auto dark">
      <Outlet />
    </main>
  );
}
