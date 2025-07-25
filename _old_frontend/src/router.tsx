import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import CampaignDetailsPage from "./pages/private/CampaignDetailsPage";
import CampaignListPage from "./pages/private/CampaignListPage";
import DashboardPage from "./pages/private/DashboardPage";
import ScenarioDetailsPage from "./pages/private/ScenarioDetailsPage";
import AuthenticationPage from "./pages/public/AuthenticationPage";
import ErrorPage from "./pages/public/ErrorPage";
import HomePage from "./pages/public/HomePage";
import SandboxPage from "./pages/public/SandboxPage";
import ScenarioListPage from "./pages/public/ScenarioListPage";

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
        path: "/dashboard",
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/auth",
        index: true,
        element: <AuthenticationPage />,
      },
      {
        path: "/scenarios",
        element: <ScenarioListPage />,
      },
      {
        path: "/scenario/:id",
        element: <ScenarioDetailsPage />,
      },
      {
        path: "/campaigns",
        element: <CampaignListPage />,
      },
      {
        path: "/campaign/:id",
        element: <CampaignDetailsPage />,
      },
      {
        path: "/labo",
        element: <SandboxPage />,
      },
    ],
  },
]);
export default router;
