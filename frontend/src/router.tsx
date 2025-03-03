import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import AuthPage from "./pages/AuthPage";
import CampaignPage from "./pages/CampaignPage";
import CampaignsPage from "./pages/CampaignsPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ScenarioPage from "./pages/ScenarioPage";
import ScenariosPage from "./pages/ScenariosPage";

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
        path: "/scenarios",
        element: <ScenariosPage />,
      },
      {
        path: "/scenario/:id",
        element: <ScenarioPage />,
      },
      {
        path: "/campaigns",
        element: <CampaignsPage />,
      },
      {
        path: "/campaign/:id",
        element: <CampaignPage />,
      },
    ],
  },
]);
export default router;
