import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import AuthenticationPage from "./pages/public/AuthenticationPage";
import CampaignDetailsPage from "./pages/private/CampaignDetailsPage";
import CampaignListPage from "./pages/private/CampaignListPage";
import DashboardPage from "./pages/private/DashboardPage";
import ErrorPage from "./pages/public/ErrorPage";
import HomePage from "./pages/public/HomePage";
import ScenarioDetailsPage from "./pages/private/ScenarioDetailsPage";
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
    ],
  },
]);
export default router;
