import { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dob?: string,
    pincode?: string
  ) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        return { error: { message: data.detail || "Login failed" } };
      }

      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);

      const profileRes = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (!profileRes.ok) {
        return { error: { message: "Failed to load user profile" } };
      }

      const profile = await profileRes.json();

      // ✅ Normalize backend snake_case to frontend camelCase
      const normalizedUser = {
        userId: profile.user_id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        username: profile.username,
        email: profile.email,
        dob: profile.dob,
        pincode: profile.pincode,
        hasCompletedOnboarding:
          profile.hasCompletedOnboarding ?? profile.has_completed_onboarding,
        genres: profile.genres ?? profile.preferred_genres,
        languages: profile.languages ?? profile.preferred_languages,
        preferred: profile.preferred ?? profile.preferred_mood,
      };

      setUser(normalizedUser);
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
    dob?: string,
    pincode?: string
  ) => {
    try {
      const res = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          username: email.split("@")[0],
          dob,
          pincode,
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
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}
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
