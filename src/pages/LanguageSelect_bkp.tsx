import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LanguageSelect = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const navigate = useNavigate();

  const languages = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Malayalam",
    "Any language with English subtitles",
  ];

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="relative w-full h-screen">
      <div className="w-full h-screen bg-black overflow-x-hidden">
        <div
          className="w-screen h-screen bg-cover bg-center relative"
          style={{ backgroundImage: 'url("/assets/Website_Background.svg")' }}
        >
          <img
            src="/assets/Blur_BG.svg"
            alt="Blur Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-[#C29D54] w-[90%] max-w-md z-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#C29D54]">
              What languages do you watch movies in?
            </h2>

            <div className="flex flex-col gap-3 mb-6">
              {languages.map((lang) => {
                const selected = selectedLanguages.includes(lang);
                return (
                  <div
                    key={lang}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition border ${
                      selected
                        ? "border-[#C29D54] bg-black text-[#C29D54]"
                        : "border-transparent bg-black text-[#C29D54]/80 hover:bg-[#C29D54]/10"
                    }`}
                    onClick={() => toggleLanguage(lang)}
                  >
                    {lang}
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="mt-6 flex justify-between items-center">
              {/* Back */}
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full border border-[#C29D54] text-[#C29D54] hover:text-black hover:bg-[#C29D54] transition"
                title="Back"
              >
                ←
              </button>

              {/* Next */}
              <button
                onClick={() =>
                  selectedLanguages.length > 0 && navigate("/mood")
                }
                disabled={selectedLanguages.length === 0}
                className={`w-10 h-10 rounded-full border text-2xl font-bold transition flex items-center justify-center ${
                  selectedLanguages.length > 0
                    ? "border-[#C29D54] text-[#C29D54] hover:bg-[#C29D54] hover:text-black"
                    : "border-[#C29D54]/30 text-[#C29D54]/30 cursor-not-allowed"
                }`}
                title={
                  selectedLanguages.length > 0
                    ? "Next"
                    : "Select a language first"
                }
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
