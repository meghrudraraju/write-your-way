import React from "react";
import { ThumbsUp, Eye, ThumbsDown } from "lucide-react";

interface Movie {
  title: string;
  poster: string;
}

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <div className="bg-black/80 backdrop-blur-lg border border-[#C29D54] rounded-xl overflow-hidden shadow-md text-[#C29D54]">
      <img
        src={movie.poster}
        alt={movie.title}
	className="w-full h-64 object-contain rounded-t-xl bg-black"      
	/>
      <div className="p-4 space-y-4">
        <h3 className="text-xl font-semibold text-center">{movie.title}</h3>

        <div className="flex justify-around items-center">
          {/* Like */}
          <div className="flex flex-col items-center gap-1">
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-[#C29D54] hover:bg-[#C29D54] hover:text-black text-[#C29D54] transition">
              <ThumbsUp className="w-5 h-5" />
            </button>
            <span className="text-xs font-medium">Will Watch</span>
          </div>

          {/* Already Watched */}
          <div className="flex flex-col items-center gap-1">
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-[#C29D54] hover:bg-[#C29D54] hover:text-black text-[#C29D54] transition">
              <Eye className="w-5 h-5" />
            </button>
            <span className="text-xs font-medium">Already Watched</span>
          </div>

          {/* Dislike */}
          <div className="flex flex-col items-center gap-1">
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-[#C29D54] hover:bg-[#C29D54] hover:text-black text-[#C29D54] transition">
              <ThumbsDown className="w-5 h-5" />
            </button>
            <span className="text-xs font-medium">Not for Me</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
