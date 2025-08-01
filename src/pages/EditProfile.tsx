// src/pages/EditProfile.tsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "@/lib/axios";
import { ChevronDown, ChevronUp } from "lucide-react";

const allGenres = ["Action", "Thriller", "Drama", "Romance", "Comedy", "Fantasy"];
const allLanguages = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Any language with English subtitles",
];

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    pincode: "",
    genres: [] as string[],
    languages: [] as string[],
    preferred: "",
    hasCompletedOnboarding: false, // ✅ added here
  });

  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const genreRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/me");
      const user = res.data;

      setForm({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        dob: user.dob || "",
        pincode: user.pincode || "",
        genres: user.genres ? user.genres.split(",") : [],
        languages: user.languages ? user.languages.split(",") : [],
        preferred: user.preferred?.replace(/"/g, "") || "",
        hasCompletedOnboarding: user.hasCompletedOnboarding ?? false, // ✅ added here
      });

      console.log("✅ Final Form set", {
        genres: user.genres,
        genresArray: user.genres?.split(","),
        languages: user.languages,
        languagesArray: user.languages?.split(","),
      });
    } catch (err) {
      console.error("❌ Failed to fetch user data:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (genreRef.current && !genreRef.current.contains(e.target as Node)) {
        setGenreDropdownOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleGenre = (genre: string) => {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const toggleLanguage = (lang: string) => {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };


const handleSave = async () => {
  if (form.genres.length === 0 || form.languages.length === 0) {
    alert("Please select at least one genre and one language.");
    return;
  }

  try {
    await axios.patch("/api/me", {
      genres: form.genres,
      languages: form.languages,
      preferred: form.preferred || null,
      hasCompletedOnboarding: !!form.hasCompletedOnboarding,
    });

    alert("Profile updated!");
    navigate("/dashboard");
  } catch (err) {
    console.error("Failed to update profile:", err);
  }
};

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="w-full h-screen bg-black text-[#C29D54] flex items-center justify-center">
      <div className="border border-[#C29D54] rounded-xl p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h2>

        <div className="space-y-4">
          {["firstName", "lastName", "email", "dob", "pincode"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "dob" ? "date" : field === "email" ? "email" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              readOnly
              className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54] cursor-not-allowed opacity-60"
            />
          ))}

          {/* Genre Multi-select */}
          <div ref={genreRef}>
            <label className="text-sm">Genres</label>
            <div
              className={`relative border ${form.genres.length === 0 ? "border-red-500" : "border-[#C29D54]"} rounded-md px-3 py-2 flex flex-wrap gap-2 items-center cursor-pointer bg-black`}
              onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
            >
              {form.genres.length === 0 && (
                <span className="text-[#C29D54]/50">Choose genres</span>
              )}
              {form.genres.map((genre) => (
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
                {genreDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
            {genreDropdownOpen && (
              <div className="mt-2 bg-black text-[#C29D54] rounded-md border border-[#C29D54] max-h-40 overflow-y-auto">
                {allGenres.map((genre) => (
                  <div
                    key={genre}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#C29D54]/30 ${
                      form.genres.includes(genre) ? "bg-[#C29D54] text-black" : ""
                    }`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language Multi-select */}
          <div ref={languageRef}>
            <label className="text-sm">Languages</label>
            <div
              className={`relative border ${form.languages.length === 0 ? "border-red-500" : "border-[#C29D54]"} rounded-md px-3 py-2 flex flex-wrap gap-2 items-center cursor-pointer bg-black`}
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            >
              {form.languages.length === 0 && (
                <span className="text-[#C29D54]/50">Choose languages</span>
              )}
              {form.languages.map((lang) => (
                <span
                  key={lang}
                  className="flex items-center bg-[#C29D54] text-black px-3 py-1 rounded-full text-sm"
                >
                  {lang}
                  <button
                    className="ml-2 text-xs font-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLanguage(lang);
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))}
              <div className="absolute right-3 top-3 text-[#C29D54]">
                {languageDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
            {languageDropdownOpen && (
              <div className="mt-2 bg-black text-[#C29D54] rounded-md border border-[#C29D54] max-h-40 overflow-y-auto">
                {allLanguages.map((lang) => (
                  <div
                    key={lang}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#C29D54]/30 ${
                      form.languages.includes(lang) ? "bg-[#C29D54] text-black" : ""
                    }`}
                    onClick={() => toggleLanguage(lang)}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
{/*
          <input
            name="preferred"
            type="text"
            placeholder="Preferred (Trending/Highly Rated/Critics)"
            value={form.preferred}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54]"
          />
*/}
          </div>

        <div className="flex justify-between mt-6">
<button
  onClick={() => {
    if (form.genres.length === 0 || form.languages.length === 0) {
      alert("You must select at least one genre and one language before going back.");
      return;
    }
    navigate(-1);
  }}
  className="w-1/3 py-2 border border-[#C29D54] rounded-md hover:bg-[#C29D54] hover:text-black transition"
>
  Back
</button>
          <button
            onClick={handleSave}
            className="w-1/2 py-2 bg-[#C29D54] text-black rounded-md font-semibold hover:bg-[#b18b41] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

