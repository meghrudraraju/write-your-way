import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAuth } from "@/hooks/useAuth";

const EditProfile = () => {
  const navigate = useNavigate();
  const onboarding = useOnboarding();
  const { patchUserProfile } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    pincode: "",
  });

  // Safe fallback for onboarding
  const genres = onboarding?.genres ?? [];
  const setGenres = onboarding?.setGenres ?? (() => {});
  const languages = onboarding?.languages ?? [];
  const setLanguages = onboarding?.setLanguages ?? (() => {});
  const mood = onboarding?.mood ?? "";
  const setMood = onboarding?.setMood ?? (() => {});

  // ✅ Fetch user data from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();

        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          dob: data.dob || "",
          pincode: data.pincode || "",
        });

        setGenres(Array.isArray(data.genres) ? data.genres : []);
        setLanguages(Array.isArray(data.languages) ? data.languages : []);
        setMood(data.preferred || "");
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await patchUserProfile({
      ...form,
      genres,
      languages,
      preferred: mood,
    });

    alert("Profile updated!");
    navigate("/dashboard");
  };

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
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54] placeholder-[#C29D54]/60 focus:outline-none focus:ring-2 focus:ring-[#C29D54]"
            />
          ))}

          <input
            name="genres"
            type="text"
            placeholder="Genres (comma separated)"
            value={Array.isArray(genres) ? genres.join(", ") : ""}
            onChange={(e) =>
              setGenres(e.target.value.split(",").map((g) => g.trim()))
            }
            className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54] placeholder-[#C29D54]/60 focus:outline-none focus:ring-2 focus:ring-[#C29D54]"
          />

          <input
            name="languages"
            type="text"
            placeholder="Languages (comma separated)"
            value={Array.isArray(languages) ? languages.join(", ") : ""}
            onChange={(e) =>
              setLanguages(e.target.value.split(",").map((l) => l.trim()))
            }
            className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54] placeholder-[#C29D54]/60 focus:outline-none focus:ring-2 focus:ring-[#C29D54]"
          />

          <input
            name="preferred"
            type="text"
            placeholder="Preferred (Trending/Highly Rated/Critics)"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54] placeholder-[#C29D54]/60 focus:outline-none focus:ring-2 focus:ring-[#C29D54]"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
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
