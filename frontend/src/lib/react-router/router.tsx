import { createBrowserRouter } from "react-router";
import Campaign from "@/pages/Campaign";
import Home from "@/pages/Home";
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
        path: "/campaigns/:id",
        element: <Campaign />,
      },
    ],
  },
]);
export default router;
