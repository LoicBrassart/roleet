import type { User } from "@/lib/zustand/userStore";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.JSX.Element;
  loader: () => User | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, loader }) => {
  const user = loader();
  return user ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;
