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
    <div className="relative w-80 h-[420px] text-[#C29D54] perspective">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden bg-black/80 backdrop-blur-lg border border-[#C29D54] rounded-xl shadow-md p-4 flex flex-col justify-between">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-60 object-contain rounded-lg"
          />
          <div className="text-center text-xl font-semibold mt-2">{movie.title}</div>
          <CTAs onClick={handleAction} />
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black/90 backdrop-blur-lg border border-[#C29D54] rounded-xl shadow-md p-4 flex flex-col justify-center items-center">
          <div className="text-lg mb-6">Next suggestion coming up...</div>
          <CTAs onClick={handleAction} />
        </div>
      </div>
    </div>
  );
};

const CTAs = ({ onClick }: { onClick: () => void }) => (
  <div className="flex justify-around items-center mt-4">
    <ActionButton icon={<ThumbsUp />} label="Will Watch" onClick={onClick} />
    <ActionButton icon={<Eye />} label="Already Watched" onClick={onClick} />
    <ActionButton icon={<ThumbsDown />} label="Not for Me" onClick={onClick} />
  </div>
);

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
      className="w-10 h-10 flex items-center justify-center rounded-full border border-[#C29D54] hover:bg-[#C29D54] hover:text-black text-[#C29D54] transition"
      onClick={onClick}
    >
      {icon}
    </button>
    <span className="text-xs">{label}</span>
  </div>
);

export default MovieCard;