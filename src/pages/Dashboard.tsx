import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "@/components/MovieCard";

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
  const hasShownIntervention = sessionStorage.getItem("hasShownIntervention");
  const mood = localStorage.getItem("selectedMood"); // or sessionStorage, depending on where you store it

  console.log("📍 hasShownIntervention =", hasShownIntervention);
  console.log("📍 selectedMood =", mood);

  if (!hasShownIntervention) {
    console.log("⏳ Showing intervention in 5s");

    const timer = setTimeout(() => {
      console.log("✅ Setting hasShownIntervention = true");
      sessionStorage.setItem("hasShownIntervention", "true");
      navigate("/intervention-mood");
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [navigate]);
  const handleAction = (movie: Movie) => {
    if (!watchlist.find((m) => m.title === movie.title)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const topMovies = [
    { title: "Inception", poster: "/assets/inception.jpg" },
    { title: "Interstellar", poster: "/assets/interstellar.jpg" },
    { title: "The Dark Knight", poster: "/assets/dark_knight.jpg" },
  ];

  return (
    <div className="w-full h-screen bg-black overflow-hidden text-[#C29D54] relative">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/Website_Background_nologo.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <img
          src="/assets/Blur_BG.svg"
          alt="Blur Background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center space-y-10">
        <h2 className="text-2xl font-bold text-center">
          🔥 Our Top 3 Recommendations for You
        </h2>
        <div className="flex justify-center gap-6 px-4">
          {topMovies.map((movie) => (
            <MovieCard
              key={movie.title}
              movie={movie}
              onAction={() => handleAction(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface Movie {
  title: string;
  poster: string;
}

export default Dashboard;