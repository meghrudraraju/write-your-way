import React from "react";
import { Heart, Meh, ThumbsDown, Clock } from "lucide-react";

interface Movie {
  title: string;
  poster: string;
}

interface Props {
  movie: Movie;
  onFeedback: (feedback: string) => void;
}

const MovieCardFeedback: React.FC<Props> = ({ movie, onFeedback }) => {
  return (
    <div className="w-60 h-[400px] bg-black/80 backdrop-blur-lg border border-[#C29D54] rounded-xl overflow-hidden shadow-md text-[#C29D54] flex flex-col">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-48 object-contain bg-black rounded-t-xl"
      />
      <div className="flex-1 flex flex-col justify-between p-4">
        <h3 className="text-lg font-semibold text-center">{movie.title}</h3>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <FeedbackButton
            icon={<Heart />}
            label="Loved it"
            onClick={() => onFeedback("Loved")}
          />
          <FeedbackButton
            icon={<Meh />}
            label="Okay"
            onClick={() => onFeedback("Okay")}
          />
          <FeedbackButton
            icon={<ThumbsDown />}
            label="Didn't like"
            onClick={() => onFeedback("Disliked")}
          />
          <FeedbackButton
            icon={<Clock />}
            label="Haven’t watched"
            onClick={() => onFeedback("Not Watched")}
          />
        </div>
      </div>
    </div>
  );
};

const FeedbackButton = ({
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
    <span className="text-xs text-center">{label}</span>
  </div>
);

export default MovieCardFeedback;
