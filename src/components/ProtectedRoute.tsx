import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return user ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
