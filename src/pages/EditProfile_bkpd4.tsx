import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const { patchUserProfile } = useAuth();

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
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/me"); // assumes FastAPI route: @router.get("/me")
        const data = res.data;

        setForm({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          dob: data.dob || "",
          pincode: data.pincode || "",
          genres: data.genres || "",
          languages: data.languages || "",
          preferred: data.preferred?.replace(/"/g, "") || "", // remove stray quotes
        });
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await patchUserProfile({
        firstName: form.firstName,
        lastName: form.lastName,
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
      console.error("Failed to save:", err);
      alert("Something went wrong while updating.");
    }
  };

  if (loading) {
    return <div className="text-center text-[#C29D54]">Loading profile...</div>;
  }

  return (
    <div className="w-full h-screen bg-black text-[#C29D54] flex items-center justify-center">
      <div className="border border-[#C29D54] rounded-xl p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h2>

        <div className="space-y-4">
          {["firstName", "lastName", "email", "dob", "pincode", "genres", "languages", "preferred"].map((field) => (
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
