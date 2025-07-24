import { createBrowserRouter } from "react-router";
import Authentication from "@/pages/Authentication";
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
        path: "/auth",
        index: true,
        element: <Authentication />,
      },
    ],
  },
]);
export default router;
