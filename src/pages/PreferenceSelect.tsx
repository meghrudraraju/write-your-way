import { useState } from "react";
import { useNavigate } from "react-router-dom";

const preferences = [
  {
    label: "Trending Now",
    value: "trending",
  },
  {
    label: "Highly Rated",
    value: "highly_rated",
  },
  {
    label: "Critics Choice",
    value: "critics_choice",
  },
];

const PreferenceSelect = () => {
  const [selectedPref, setSelectedPref] = useState("");
  const navigate = useNavigate();

  const handleSelectPref = (value: string) => {
    setSelectedPref((prev) => (prev === value ? "" : value));
  };

  return (
    <div className="w-full h-screen bg-black overflow-x-hidden">
      <div
        className="w-screen h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url("/assets/Website_Background.svg")` }}
      >
        {/* Overlay Blur */}
        <img
          src="/assets/Blur_BG.svg"
          alt="Blur Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Popup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-[#C29D54] w-[90%] max-w-md z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#C29D54]">
            We are almost there! What do you prefer?
          </h2>

          {/* Preference Options */}
          <div className="flex flex-col gap-4 mb-6">
            {preferences.map((pref) => {
              const isSelected = selectedPref === pref.value;
              return (
                <div
                  key={pref.value}
                  className={`w-full px-4 py-3 rounded-lg cursor-pointer text-center transition font-semibold border
                    ${isSelected ? "border-[#C29D54] text-[#C29D54] bg-black" : "border-transparent text-[#C29D54]/70 bg-black hover:border-[#C29D54]/40"}`}
                  onClick={() => handleSelectPref(pref.value)}
                >
                  {pref.label}
                </div>
              );
            })}
          </div>

          {/* CTA Arrow */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-[#C29D54] text-[#C29D54] hover:text-black hover:bg-[#C29D54] transition"
              title="Back"
            >
              ←
            </button>

            <button
              onClick={() => selectedPref && navigate("/results")}
              disabled={!selectedPref}
              className={`w-10 h-10 rounded-full border text-2xl font-bold transition flex items-center justify-center
                ${selectedPref
                  ? "border-[#C29D54] text-[#C29D54] hover:bg-[#C29D54] hover:text-black"
                  : "border-[#C29D54]/30 text-[#C29D54]/30 cursor-not-allowed"}`}
              title={selectedPref ? "Analyze Now" : "Select a preference first"}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
);
};

export default PreferenceSelect;
