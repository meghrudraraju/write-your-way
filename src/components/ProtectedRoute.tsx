// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  console.log("👤 ProtectedRoute user object:", user);

  // User not logged in
  if (!user) return <Navigate to="/auth" replace />;

  // Onboarding not completed → redirect to onboarding screen
  if (!user.hasCompletedOnboarding) {
    return <Navigate to="/welcome" replace />;
  }

  // Authenticated and completed onboarding
  return children;
};

export default ProtectedRoute;