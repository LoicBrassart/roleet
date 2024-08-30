import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { HomeLoader } from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
        loader: () => {
          return HomeLoader();
        },
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);
export default router;
