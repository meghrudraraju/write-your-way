import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";

const EditProfile = () => {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me"); // ✅ Corrected endpoint
        const u = res.data;

        setForm({
          firstName: u.first_name || "",
          lastName: u.last_name || "",
          email: u.email || "",
          dob: u.dob || "",
          pincode: u.pincode || "",
          genres: u.genres || "",
          languages: u.languages || "",
          preferred: u.preferred?.replace(/"/g, "") || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
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
      await axios.patch("/api/me", form);
      alert("Profile updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <div className="space-y-3">
        {["firstName", "lastName", "email", "dob", "pincode", "genres", "languages", "preferred"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "dob" ? "date" : "text"}
            value={(form as any)[field]}
            onChange={handleChange}
            className="block w-full p-2 border border-white bg-black text-white rounded"
            placeholder={field}
          />
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-yellow-600 text-black py-2 px-4 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
