import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg"; // ✅ background image

const FirstLanding = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Trigger fade-in animation on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Animated overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 animate-pulse"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-emerald-300/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-emerald-300/30 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Content box with enhanced animations */}
      <div 
        className={`relative z-10 bg-white/90 shadow-2xl border rounded-2xl p-8 w-[90%] max-w-lg text-center transform transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl hover:bg-white/95 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Animated title */}
        <h1 className={`text-4xl font-extrabold mb-2 text-emerald-700 tracking-wide drop-shadow-lg transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          EduToolbox
        </h1>
        
        {/* ✅ Animated tagline */}
        <p className={`italic text-gray-600 mb-6 text-lg transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          "Focus more, switch less."
        </p>

        {/* Animated description */}
        <p className={`text-gray-700 text-base sm:text-lg mb-6 leading-relaxed transition-all duration-1000 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          EduToolbox is your <span className="font-semibold text-emerald-800 transition-colors duration-300 hover:text-emerald-600">all in one learning companion</span>.
          Access powerful tools like <span className="text-emerald-600 font-medium transition-all duration-300 hover:text-emerald-800 hover:font-semibold">Calculator</span>,
          <span className="text-emerald-600 font-medium transition-all duration-300 hover:text-emerald-800 hover:font-semibold"> Grade Checker</span>,{" "}
          <span className="text-emerald-600 font-medium transition-all duration-300 hover:text-emerald-800 hover:font-semibold">To-Do List</span>, and{" "}
          <span className="text-emerald-600 font-medium transition-all duration-300 hover:text-emerald-800 hover:font-semibold">Unit Converter</span> everything you need to make
          studying easier and smarter.
        </p>

        {/* Enhanced button with ripple effect */}
        <div className={`transition-all duration-1000 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <button
            onClick={() => navigate("/landing")} // 👉 change to "/login" if direct
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:from-emerald-600 hover:to-emerald-700 active:scale-95 ${
              isHovered ? 'animate-pulse' : ''
            }`}
          >
            <span className="relative z-10">Get Started</span>
            {/* Ripple effect overlay */}
            <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-500 hover:scale-100"></div>
            {/* Shine effect */}
            <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-1000 hover:left-[100%]"></div>
          </button>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-5 right-5 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-5 left-5 w-12 h-12 border-2 border-emerald-300/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
    </div>
  );
};

export default FirstLanding;