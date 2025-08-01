import React, { useState } from "react";
import { ThumbsUp, Eye, ThumbsDown } from "lucide-react";

interface Movie {
  title: string;
  poster: string;
}

interface Props {
  movie: Movie;
  onAction: () => void;
}

const MovieCard: React.FC<Props> = ({ movie, onAction }) => {
  const [flipped, setFlipped] = useState(false);

  const handleAction = () => {
    setFlipped(true);
    setTimeout(() => {
      onAction();
      setFlipped(false);
    }, 600);
  };

  return (
    <div className="perspective w-80 h-[420px] relative bg-black/80 backdrop-blur-lg border border-[#C29D54] rounded-xl overflow-hidden shadow-md text-[#C29D54]">
      <div
        className={`transition-transform duration-600 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="backface-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-contain bg-black rounded-t-xl"
          />
          <div className="p-4 space-y-4">
            <h3 className="text-xl font-semibold text-center">{movie.title}</h3>
            <div className="flex justify-around items-center">
              <ActionButton icon={<ThumbsUp />} label="Will Watch" onClick={handleAction} />
              <ActionButton icon={<Eye />} label="Already Watched" onClick={handleAction} />
              <ActionButton icon={<ThumbsDown />} label="Not for Me" onClick={handleAction} />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex items-center justify-center bg-black rounded-xl">
          <img
            src={movie.poster}
            alt="Loading next movie..."
            className="w-full h-full object-cover rounded-xl opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <div className="flex flex-col items-center gap-1">
    <button
      className="w-12 h-12 flex items-center justify-center rounded-full border border-[#C29D54] hover:bg-[#C29D54] hover:text-black text-[#C29D54] transition"
      onClick={onClick}
    >
      {icon}
    </button>
    <span className="text-xs font-medium">{label}</span>
  </div>
);

export default MovieCard;