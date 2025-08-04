import { useState } from "react";
import MovieCard from "@/components/MovieCard";

const movies = [
  { title: "Inception", poster: "/assets/inception.jpg" },
  { title: "Interstellar", poster: "/assets/interstellar.jpg" },
  { title: "The Dark Knight", poster: "/assets/dark_knight.jpg" },
  { title: "Harry Potter", poster: "/assets/harrypotter.jpg" },
  { title: "Imitation Game", poster: "/assets/imitationgame.jpg" },
  { title: "Lord of the Rings", poster: "/assets/lotr.jpg" },
  { title: "Pursuit of Happyness", poster: "/assets/pursuit_of_happiness.jpg" },
];

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const handleAction = (movie: Movie) => {
    if (!watchlist.find((m) => m.title === movie.title)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden text-[#C29D54]">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url("/assets/Website_Background.svg")` }}
        />
        <img
          src="/assets/Blur_BG.svg"
          alt="Blurred overlay"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Foreground Content */}
      <div className="pt-32 px-6 w-full max-w-7xl mx-auto space-y-16">
        <MovieSection title="🔥 Hot Picks" movies={movies.slice(0, 3)} />
        {watchlist.length > 0 && (
          <MovieSection title="🎯 Movies You Want to Watch" movies={watchlist} />
        )}
      </div>
    </div>
  );
};

interface Movie {
  title: string;
  poster: string;
}

const MovieSection = ({ title, movies }: { title: string; movies: Movie[] }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  </div>
);

export default Dashboard;