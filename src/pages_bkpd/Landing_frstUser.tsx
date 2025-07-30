import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <img
        src="/assets/Landing_frstUser.svg"
        alt="Landing"
        className="w-full h-full object-cover"
      />

      {/* CTA Overlay */}
      <button
        onClick={() => navigate("/genre")}
        className="absolute top-[60%] left-1/2 -translate-x-1/2 bg-[#C29D54] text-black text-lg px-6 py-3 rounded-md font-semibold hover:bg-[#b18b41] transition"
      >
        Begin Now
      </button>
    </div>
  );
};

export default Landing;
