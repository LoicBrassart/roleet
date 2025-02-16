import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ScenarioPage from "./pages/ScenarioPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/auth",
        index: true,
        element: <AuthPage />,
      },
      {
        path: "/scenario/:id",
        element: <ScenarioPage />,
      },
    ],
  },
]);
export default router;
