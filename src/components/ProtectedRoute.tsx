// src/components/ProtectedRoute.tsx
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !loading &&
      user &&
      !user.hasCompletedOnboarding &&
      location.pathname !== "/welcome"
    ) {
      console.log("🔁 Redirecting to /welcome from:", location.pathname);
      navigate("/welcome", { replace: true });
    }
  }, [user, loading, location.pathname]);

  if (loading || (user && !user.hasCompletedOnboarding && location.pathname !== "/welcome")) {
    return (
      <div className="text-white text-center mt-20">
        Loading your First Screen before welcome screen...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;