import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "@/lib/axios"; // ✅ your axios instance with baseURL
import { useOnboarding } from "@/hooks/useOnboarding";

const EditProfile = () => {
  const navigate = useNavigate();
  const onboarding = useOnboarding();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    pincode: "",
    genres: "",
    languages: "",
    preferred: "",
  });

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/users/me");
      const data = res.data;

      setForm({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email || "",
        dob: data.dob || "",
        pincode: data.pincode || "",
        genres: data.genres || "",
        languages: data.languages || "",
        preferred: data.preferred?.replace(/"/g, "") || "", // remove quotes if present
      });

      onboarding.setGenres(data.genres ? data.genres.split(",") : []);
      onboarding.setLanguages(data.languages ? data.languages.split(",") : []);
      onboarding.setMood(data.preferred?.replace(/"/g, "") || "");
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.patch("/api/users/me", {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        dob: form.dob,
        pincode: form.pincode,
        genres: form.genres,
        languages: form.languages,
        preferred: form.preferred,
      });

      alert("Profile updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Update failed.");
    }
  };

  return (
    <div className="w-full h-screen bg-black text-[#C29D54] flex items-center justify-center">
      <div className="border border-[#C29D54] rounded-xl p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h2>

        <div className="space-y-4">
          {["firstName", "lastName", "email", "dob", "pincode", "genres", "languages", "preferred"].map(
            (field) => (
              <input
                key={field}
                name={field}
                type={field === "dob" ? "date" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(form as any)[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54] placeholder-[#C29D54]/60 focus:outline-none focus:ring-2 focus:ring-[#C29D54]"
              />
            )
          )}
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
