import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MoodSelect = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const navigate = useNavigate();

  const moods = [
    {
      label: "Happy",
      value: "happy",
      icon: "/assets/Happy_Face.svg",
      selectedIcon: "/assets/Happy_Face_Selected.svg",
    },
    {
      label: "Sad",
      value: "sad",
      icon: "/assets/Sad_Face.svg",
      selectedIcon: "/assets/Sad_Face_Selected.svg",
    },
    {
      label: "Neutral",
      value: "neutral",
      icon: "/assets/Neutral_Face.svg",
      selectedIcon: "/assets/Neutral_Face_Selected.svg",
    },
  ];

  const handleSelectMood = (value: string) => {
    setSelectedMood((prev) => (prev === value ? "" : value));
  };

  return (
<div className="w-full h-screen bg-black overflow-x-hidden">
      <div
        className="w-screen h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url("/assets/Website_Background.svg")`,
        }}
      >
        {/* Blurred Overlay using Blur_BG.svg */}
        <img
          src="/assets/Blur_BG.svg"
          alt="Blur Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Mood selection popup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-[#C29D54] w-[90%] max-w-md z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#C29D54]">
            What’s your mood today?
          </h2>

          {/* Mood Tiles */}
          <div className="flex justify-between gap-4 mb-6">
            {moods.map((mood) => {
              const isSelected = selectedMood === mood.value;
              return (
                <div
                  key={mood.value}
                  className={`p-4 rounded-lg w-full transition cursor-pointer text-center ${
                    isSelected
                      ? "border-2 border-[#C29D54] bg-black text-[#C29D54]"
                      : "border-none bg-black text-[#C29D54]/80"
                  }`}
                  onClick={() => handleSelectMood(mood.value)}
                >
                  <img
                    src={isSelected ? mood.selectedIcon : mood.icon}
                    alt={mood.label}
                    className="w-12 h-12 mx-auto"
                  />
                  <p className="mt-2 font-medium">{mood.label}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Arrows */}
          <div className="mt-6 flex justify-between items-center">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-[#C29D54] text-[#C29D54] hover:text-black hover:bg-[#C29D54] transition"
              title="Back"
            >
              ←
            </button>

            {/* Forward Button */}
            <button
              onClick={() => selectedMood && navigate("/genre")}
              disabled={!selectedMood}
              className={`w-10 h-10 rounded-full border text-2xl font-bold transition flex items-center justify-center ${
                selectedMood
                  ? "border-[#C29D54] text-[#C29D54] hover:bg-[#C29D54] hover:text-black"
                  : "border-[#C29D54]/30 text-[#C29D54]/30 cursor-not-allowed"
              }`}
              title={selectedMood ? "Next" : "Select mood first"}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSelect;
