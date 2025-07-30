import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import LandingFrstUser from "./pages/Landing_frstUser";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import MoodSelect from "./pages/MoodSelect";
import GenreQuestion from "./pages/GenreQuestion";
import LanguageSelect from "./pages/LanguageSelect";
import EditProfile from "./pages/EditProfile";
import Loader from "@/components/Loader";

// ✅ Wrap all logic inside a component that gets router context
const AppRoutes = () => {
  const { user, loading } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user) {
      const completed = user.hasCompletedOnboarding === true;
      setOnboardingComplete(completed);

      if (location.pathname === "/") {
	navigate(completed ? "/" : "/welcome", { replace: true });
      }
    }
  }, [user, loading, location.pathname, navigate]);

  if (!loading && !user) {
    return <Routes><Route path="*" element={<AuthPage />} /></Routes>;
  }

  if (loading || (user && onboardingComplete === null)) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={onboardingComplete ? <Dashboard /> : <LandingFrstUser />} />
	<Route path="welcome" element={<LandingFrstUser />} />
        <Route path="mood" element={<MoodSelect />} />
        <Route path="genre" element={<GenreQuestion />} />
        <Route path="language" element={<LanguageSelect />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// ✅ Final App component
const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
