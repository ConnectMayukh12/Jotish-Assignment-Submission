import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Preserve the intended destination so we can redirect back after sign-in
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
