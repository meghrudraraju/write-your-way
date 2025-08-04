import { useState } from "react";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";

const InterventionMood = () => {
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

  const handleSubmit = async () => {
    if (!selectedMood) return;

    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        "/api/user/mood",
        { preferred_mood: selectedMood },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Navigating to dashboard after mood selection");
      localStorage.setItem("hasCompletedMoodSelection", "true");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update mood:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-black">
      <div
        className="w-full h-full bg-cover bg-center relative"
        style={{
          backgroundImage: `url("/assets/Website_Background.svg")`,
        }}
      >
        <img
          src="/assets/Blur_BG.svg"
          alt="Blur Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-[#C29D54] w-[90%] max-w-md z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#C29D54]">
            Howdy! How are you feeling today?
          </h2>

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

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!selectedMood}
              className={`px-6 py-2 rounded-full border text-sm font-semibold transition ${
                selectedMood
                  ? "border-[#C29D54] text-[#C29D54] hover:bg-[#C29D54] hover:text-black"
                  : "border-[#C29D54]/30 text-[#C29D54]/30 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionMood;