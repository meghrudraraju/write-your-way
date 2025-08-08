import { useState } from "react";
import { Google } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    ageGroup: "",
    location: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError(null);
    const { error } = await signIn(form.email, form.password);
    if (error) setError(error.message);
    else navigate("/");
  };

  const handleSignup = async () => {
    setError(null);
    const { error } = await signUp(
      form.email,
      form.password,
      form.firstName,
      form.lastName,
      form.ageGroup,
      form.location
    );
    if (error) setError(error.message);
    else navigate("/");
  };

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  return (
    <div className="w-screen h-screen flex bg-black text-[#C29D54]">
      {/* Left Branding Panel */}
      <div
        className="w-1/2 bg-cover bg-center flex flex-col items-center justify-center p-10 relative"
        style={{ backgroundImage: 'url("/assets/Website_Background.svg")' }}
      >
        <img src="/assets/W2W_Logo.svg" alt="W2W Logo" className="w-32 h-32 mb-6" />
        <h1 className="text-4xl font-bold text-center">Welcome to W2W</h1>
        <p className="text-lg mt-4 text-center text-[#C29D54]/80">
          Pick the perfect movie, every time.
        </p>
      </div>

      {/* Right Auth Form Panel */}
      <div className="w-1/2 flex flex-col items-center justify-center p-12 relative bg-black">
        {/* Tab Switch */}
        <div className="flex gap-6 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-xl font-semibold ${
              isLogin
                ? "text-[#C29D54] border-b-2 border-[#C29D54]"
                : "text-[#C29D54]/60"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-xl font-semibold ${
              !isLogin
                ? "text-[#C29D54] border-b-2 border-[#C29D54]"
                : "text-[#C29D54]/60"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <div className="w-full max-w-sm space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="input-auth"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input-auth"
            />
            <button onClick={handleLogin} className="btn-auth">
              Login
            </button>
            <div className="text-center text-[#C29D54]/70">or</div>
            <button onClick={handleGoogleLogin} className="btn-google">
              <Google className="mr-2" size={18} /> Login with Google
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="input-auth w-1/2"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="input-auth w-1/2"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              className="input-auth"
            />
            <select
              name="ageGroup"
              value={form.ageGroup}
              onChange={handleChange}
              className="input-auth"
                      >
              <option value="">Select Age Group</option>
              <option value="teen">Under 18</option>
              <option value="young_adult">18–29</option>
              <option value="adult">30–44</option>
              <option value="senior">45+</option>
            </select>
            <input
              type="text"
              name="location"
              placeholder="Location (e.g., Mumbai, Delhi)"
              value={form.location}
              onChange={handleChange}
              className="input-auth"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input-auth"
            />
            <button onClick={handleSignup} className="btn-auth">
              Sign Up
            </button>
            <div className="text-center text-[#C29D54]/70">or</div>
            <button onClick={handleGoogleLogin} className="btn-google">
              <Google className="mr-2" size={18} /> Signup with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
