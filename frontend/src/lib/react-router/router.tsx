import { createBrowserRouter } from "react-router";
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
    ],
  },
]);
export default router;
