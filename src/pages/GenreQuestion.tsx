import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAuth } from "@/hooks/useAuth";
const allGenres = ["Action", "Thriller", "Drama", "Romance", "Comedy", "Fantasy"];
const GenreSelector = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { genres, setGenres } = useOnboarding();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(genres ?? []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleNext = () => {
    if (selectedGenres.length > 0) {
    setGenres(selectedGenres); // Use setGenres instead of updateOnboarding      
      navigate("/language");
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-x-hidden text-[#C29D54] relative">
      {/* Background Image */}
      <div className="absolute w-full h-full z-0">
        <img
          src="/assets/Website_Background_nologo.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/Blur_BG.svg"
          alt="Blur Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Popup */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          ref={dropdownRef}
          className="bg-black border border-[#C29D54] rounded-2xl max-w-xl w-full px-8 py-10 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">What kind of stories do you love?</h2>

          {/* Genre Multi-select Input */}
          <div
            className="relative border border-[#C29D54] rounded-md px-3 py-2 flex flex-wrap gap-2 items-center cursor-pointer bg-black"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedGenres.length === 0 && (
              <span className="text-[#C29D54]/50">Choose the genre you like</span>
            )}

            {selectedGenres.map((genre) => (
              <span
                key={genre}
                className="flex items-center bg-[#C29D54] text-black px-3 py-1 rounded-full text-sm"
              >
                {genre}
                <button
                  className="ml-2 text-xs font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGenre(genre);
                  }}
                >
                  ✕
                </button>
              </span>
            ))}

            <div className="absolute right-3 top-3 text-[#C29D54]">
              {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="mt-2 bg-black text-[#C29D54] rounded-md border border-[#C29D54] z-50 max-h-60 overflow-y-auto">
              {allGenres.map((genre) => (
                <div
                  key={genre}
                  className={`px-4 py-2 cursor-pointer ${
                    selectedGenres.includes(genre)
                      ? "bg-[#C29D54] text-black"
                      : "hover:bg-[#C29D54]/30"
                  }`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </div>
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-[#C29D54] text-[#C29D54] hover:text-black hover:bg-[#C29D54] transition"
              title="Back"
            >
              ←
            </button>

            <button
              onClick={handleNext}
              disabled={selectedGenres.length === 0}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition font-bold text-2xl ${
                selectedGenres.length > 0
                  ? "border-[#C29D54] text-[#C29D54] hover:text-black hover:bg-[#C29D54]"
                  : "border-[#C29D54]/30 text-[#C29D54]/30 cursor-not-allowed"
              }`}
              title={selectedGenres.length > 0 ? "Next" : "Select at least one genre"}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreSelector;
