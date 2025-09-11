import { createBrowserRouter } from "react-router";
import Authentication from "@/pages/Authentication";
import Campaign from "@/pages/Campaign";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Labo from "@/pages/Labo";
import Layout from "@/pages/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Authentication />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/labo",
        element: <Labo />,
      },
      {
        path: "/campaigns/:id",
        element: <Campaign />,
      },
    ],
  },
]);
export default router;
