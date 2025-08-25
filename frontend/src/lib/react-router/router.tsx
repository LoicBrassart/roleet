import { createBrowserRouter } from "react-router";
import Campaign from "@/pages/Campaign";
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
