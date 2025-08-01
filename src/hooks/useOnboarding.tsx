import { createContext, useContext, useState } from "react";

interface OnboardingContextType {
  genres: string[];
  setGenres: (g: string[]) => void;
  languages: string[];
  setLanguages: (l: string[]) => void;
  mood: string;
  setMood: (m: string) => void;
  onboardingComplete: boolean;
  setOnboardingComplete: (status: boolean) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [mood, setMood] = useState<string>("");
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false); // ✅

  const reset = () => {
    setGenres([]);
    setLanguages([]);
    setMood("");
    setOnboardingComplete(false); // ✅ reset onboarding too
  };

  return (
    <OnboardingContext.Provider
      value={{
        genres,
        setGenres,
        languages,
        setLanguages,
        mood,
        setMood,
        onboardingComplete,
        setOnboardingComplete, // ✅ exposed
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};