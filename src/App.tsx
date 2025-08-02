// src/App.tsx
import { useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { OnboardingProvider, useOnboarding } from "@/hooks/useOnboarding";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "./components/Layout";
import LandingFrstUser from "@/pages/Landing_frstUser";
import Dashboard from "@/pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import MoodSelect from "./pages/MoodSelect";
import GenreQuestion from "./pages/GenreQuestion";
import LanguageSelect from "./pages/LanguageSelect";
import PreferenceSelect from "./pages/PreferenceSelect";
import EditProfile from "./pages/EditProfile";

// ✅ AppRoutes uses hooks (must be inside Router)
const AppRoutes = () => {
  const { user, loading } = useAuth();
  const { onboardingComplete, setOnboardingComplete } = useOnboarding();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("📍 useEffect running. Pathname:", location.pathname);
    if (!loading && user) {
      const completed = user.hasCompletedOnboarding === true;
      setOnboardingComplete(completed);

      if (location.pathname === "/") {
        navigate(completed ? "/dashboard" : "/welcome", { replace: true });
      }

      if (completed && location.pathname === "/welcome") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading || (user && onboardingComplete === null)) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <Routes>
      {/* 🔓 Public Routes (no ProtectedRoute) */}
      <Route path="/auth" element={<AuthPage />} />


      {/* 🔐 Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/welcome" element={<LandingFrstUser />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="genre" element={<GenreQuestion />} />
        <Route path="language" element={<LanguageSelect />} />
        <Route path="preference" element={<PreferenceSelect />} />
        <Route path="mood" element={<MoodSelect />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// ✅ Final App wrapper
const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>
      <OnboardingProvider>
        <Toaster />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </OnboardingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;