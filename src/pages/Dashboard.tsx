import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

const movies = [
  {
    title: "Inception",
    poster: "/assets/inception.jpg",
  },
  {
    title: "Interstellar",
    poster: "/assets/interstellar.jpg",
  },
  {
    title: "The Dark Knight",
    poster: "/assets/dark_knight.jpg",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full h-screen bg-black overflow-x-hidden relative">
      {/* Website Background */}
      <div
        className="w-screen h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url("/assets/Website_Background.svg")`,
        }}
      >
        {/* Blurred Overlay */}
        <img
          src="/assets/Blur_BG.svg"
          alt="Blur Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Movie Sections */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-10 text-[#C29D54] space-y-12">
          <Section title="🔥 Hot Picks" />
          <Section title="🎬 Top Rated" />
          <Section title="🏆 Critically Acclaimed" />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title }: { title: string }) => (
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

