import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/users/me");
        const user = res.data;

        setForm({
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          email: user.email || "",
          dob: user.dob || "",
          pincode: user.pincode || "",
          genres: user.genres || "",
          languages: user.languages || "",
          preferred: user.preferred?.replace(/"/g, "") || "",
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.patch("/users/me", {
        ...form,
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
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54]"
            />
          ))}

          <input
            name="genres"
            type="text"
            placeholder="Genres (comma separated)"
            value={form.genres}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54]"
          />

          <input
            name="languages"
            type="text"
            placeholder="Languages (comma separated)"
            value={form.languages}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54]"
          />

          <input
            name="preferred"
            type="text"
            placeholder="Preferred (Trending/Highly Rated/Critics)"
            value={form.preferred}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#C29D54] bg-black text-[#C29D54]"
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
