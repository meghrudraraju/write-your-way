import { useState } from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const AuthPage = () => {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    pincode: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      form.dob,
      form.pincode
    );
    if (error) 
      {setError(error.message);
        return;}
      
    toast.success("🎉 Signup successful! Please log in.");
    navigate("/auth");
  };

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative text-[#C29D54]"
      style={{ backgroundImage: 'url("/assets/Website_Background.svg")' }}
    >
      {/* Blurred overlay */}
      <img
        src="/assets/Blur_BG.svg"
        alt="Blur Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col md:flex-row h-full">
        {/* Left Panel – Branding Copy */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl font-bold">What2Watch</h1>
          <p className="mt-4 text-lg text-[#C29D54]/90">Your taste. Your vibe. Your watchlist.</p>
          <ul className="mt-6 text-left text-[#C29D54]/80 space-y-2 max-w-md">
            <li>Custom picks made just for you</li>
            <li>No more decision fatigue</li>
            <li>Discover hidden gems, not just trending titles</li>
          </ul>
          <p className="mt-6 text-sm text-[#C29D54]/70">Spend less time browsing, more time watching.</p>
        </div>

        {/* Right Panel – Login/Signup Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
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

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          {/* Form */}
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
                <LogIn className="mr-2" size={18} /> Login with Google
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
              <input
                type="date"
                name="dob"
                placeholder="DOB"
                value={form.dob}
                onChange={handleChange}
                className="input-auth"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
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
                <LogIn className="mr-2" size={18} /> Signup with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
