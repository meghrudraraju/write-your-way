const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  ageGroup: string;
  location: string;
  hasCompletedOnboarding: boolean;
  genres?: string;
  languages?: string;
  preferred?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    ageGroup: string,
    location: string
  ) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  patchUserProfile: (data: {
    hasCompletedOnboarding: boolean;
    genres: string[];
    languages: string[];
    preferred: string;
  }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // ✅ initially loading

  // ✅ Rehydrate user on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const profile = await res.json();
        const normalizedUser = {
          userId: profile.user_id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          username: profile.username,
          email: profile.email,
          ageGroup: profile.ageGroup,
          location: profile.location,
          hasCompletedOnboarding:
            profile.hasCompletedOnboarding ?? profile.has_completed_onboarding,
          genres: profile.genres ?? profile.preferred_genres,
          languages: profile.languages ?? profile.preferred_languages,
          preferred: profile.preferred ?? profile.preferred_mood,
        };

        setUser(normalizedUser);
        console.log("🔁 Rehydrated user on reload:", normalizedUser);
      } catch (err) {
        setUser(null);
        console.error("❌ Failed to rehydrate user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Removing sessionStorage"
    );
    sessionStorage.removeItem("hasShownIntervention");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        return { error: { message: data.detail || "Login failed" } };
      }

      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);

      const profileRes = await fetch(`${BASE_URL}/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (!profileRes.ok) {
        return { error: { message: "Failed to load user profile" } };
      }

      const profile = await profileRes.json();

      const normalizedUser = {
        userId: profile.user_id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        username: profile.username,
        email: profile.email,
        ageGroup: profile.ageGroup,
        location: profile.location,
        hasCompletedOnboarding:
          profile.hasCompletedOnboarding ?? profile.has_completed_onboarding,
        genres: profile.genres ?? profile.preferred_genres,
        languages: profile.languages ?? profile.preferred_languages,
        preferred: profile.preferred ?? profile.preferred_mood,
      };

      setUser(normalizedUser);
      console.log("✅ Auth User Set:", normalizedUser);
      return { error: null };
    } catch (err) {
      return { error: { message: "Something went wrong" } };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string,
    pincode: string
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          username: email.split("@")[0],
          ageGroup,
          location,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        return { error: { message: data.detail || "Signup failed" } };
      }

      return { error: null };
    } catch (err) {
      return { error: { message: "Something went wrong" } };
    }
  };

  const signInWithGoogle = async () => {
    return { error: { message: "Google login not implemented" } };
  };

  const signOut = async () => {
      console.log("🚪 Logging out: clearing sessionStorage...");
    sessionStorage.removeItem("hasShownIntervention");
    localStorage.clear();
    setUser(null);
    window.location.href = "/auth"; // ← full page reload to clear sessionStorage memory

  };

  const patchUserProfile = async ({
    hasCompletedOnboarding,
    genres,
    languages,
    preferred,
  }: {
    hasCompletedOnboarding: boolean;
    genres: string[];
    languages: string[];
    preferred: string;
  }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return { error: { message: "Not authenticated" } };

      const res = await fetch(`${BASE_URL}/api/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hasCompletedOnboarding,
          genres,
          languages,
          preferred,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        return { error: { message: data.detail || "Update failed" } };
      }

      const data = await res.json();
      setUser((prev: any) => ({
        ...prev,
        hasCompletedOnboarding: data.user.hasCompletedOnboarding,
        genres: data.user.genres,
        languages: data.user.languages,
        preferred: data.user.preferred,
      }));

      return { error: null };
    } catch (err) {
      return { error: { message: "Something went wrong" } };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        patchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};