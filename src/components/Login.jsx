import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(form.email)) {
      return setError("❌ Invalid email format");
    }
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/mainmenu");
    } catch {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 animate-pulse"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 w-3 h-3 bg-emerald-300/40 rounded-full animate-bounce delay-200"></div>
        <div className="absolute top-32 right-24 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-24 left-1/5 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-16 right-1/4 w-2 h-2 bg-emerald-300/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 left-8 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Decorative rotating elements */}
      <div className="absolute top-8 right-8 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow"></div>
      <div
        className="absolute bottom-8 left-8 w-16 h-16 border-2 border-emerald-300/30 rounded-full animate-spin-slow"
        style={{ animationDirection: "reverse" }}
      ></div>

      {/* Main Login Card */}
      <div
        className={`relative z-10 bg-white/95 backdrop-blur-lg shadow-2xl border rounded-3xl p-10 w-[90%] max-w-md text-center transition-all duration-700 transform ${
          isLoaded
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95"
        }`}
      >
        <h2
          className={`text-3xl font-extrabold mb-6 text-emerald-700 drop-shadow-sm transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          Welcome Student
        </h2>

        {error && (
          <p className="text-red-600 mb-4 animate-fadeIn">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className={`space-y-5 transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            required
          />

          {/* Password Input */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer select-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Login Button with animations */}
          <button
            type="submit"
            onMouseEnter={() => setHoveredButton("login")}
            onMouseLeave={() => setHoveredButton(null)}
            className={`relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 w-full transition-all duration-300 font-semibold transform hover:from-emerald-600 hover:to-emerald-700 active:scale-95 ${
              hoveredButton === "login" ? "animate-pulse" : ""
            }`}
          >
            <span className="relative z-10">Login</span>
            <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 hover:left-[100%]"></div>
            <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-300 hover:scale-100"></div>
          </button>
        </form>

        {/* Exit Button with animations */}
        <button
          onClick={() => setShowExitConfirm(true)}
          onMouseEnter={() => setHoveredButton("exit")}
          onMouseLeave={() => setHoveredButton(null)}
          className={`mt-4 relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 w-full transition-all duration-300 font-semibold transform hover:from-red-600 hover:to-red-700 active:scale-95 ${
            hoveredButton === "exit" ? "animate-pulse" : ""
          }`}
        >
          <span className="relative z-10">Exit</span>
          <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 hover:left-[100%]"></div>
          <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-300 hover:scale-100"></div>
        </button>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-30 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center w-[90%] max-w-sm transform transition-all scale-100 animate-bounce-in border">
            <div className="mb-4">
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-800 animate-fadeIn">
              Confirm Exit
            </h3>
            <p className="mb-6 text-gray-600 text-sm sm:text-base animate-fadeIn delay-200">
              Are you sure you want to exit?
            </p>

            <div className="flex justify-center gap-4 animate-fadeIn delay-300">
              <button
                onClick={() => navigate("/landing")}
                className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:scale-105 hover:from-red-600 hover:to-red-700 active:scale-95"
              >
                <span className="relative z-10">Yes</span>
                <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-xl transition-transform duration-300 hover:scale-100"></div>
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="relative overflow-hidden bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:scale-105 hover:from-gray-600 hover:to-gray-700 active:scale-95"
              >
                <span className="relative z-10">No</span>
                <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-xl transition-transform duration-300 hover:scale-100"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
