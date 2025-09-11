import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg";
import { auth } from "../firebase";
import { FaCalculator, FaClipboardList, FaList, FaRuler } from "react-icons/fa";

const Mainmenu = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || "User");
      }
    });
    setIsLoaded(true);
    return () => unsubscribe();
  }, []);

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

      {/* Decorative rotating rings */}
      <div className="absolute top-8 right-8 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow"></div>
      <div
        className="absolute bottom-8 left-8 w-16 h-16 border-2 border-emerald-300/30 rounded-full animate-spin-slow"
        style={{ animationDirection: "reverse" }}
      ></div>

      {/* Main Card */}
      <div
        className={`relative z-10 bg-white/95 backdrop-blur-lg shadow-2xl border rounded-3xl p-10 w-[90%] max-w-md text-center transition-all duration-700 hover:shadow-3xl hover:bg-white/98 transform ${
          isLoaded
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95"
        }`}
      >
        <h2
          className={`text-lg sm:text-xl font-bold mb-2 text-emerald-700 transition-all duration-1000 delay-200 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          Hello, {username}! Welcome to EduToolbox
          
        </h2>
        <h1
          className={`text-2xl sm:text-3xl font-extrabold mb-6 text-gray-800 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          EduToolbox Menu
        </h1>

        <div
          className={`space-y-5 transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <Menubtn
            btnname="Calculator"
            to="/calculator"
            icon={<FaCalculator />}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            gradient="from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
          />
          <Menubtn
            btnname="Grade Checker"
            to="/gradechecker"
            icon={<FaClipboardList />}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            gradient="from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          />
          <Menubtn
            btnname="To-Do List"
            to="/todolist"
            icon={<FaList />}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            gradient="from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700"
          />
          <Menubtn
            btnname="Unit Converter"
            to="/unitcon"
            icon={<FaRuler />}
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            gradient="from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
          />

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            onMouseEnter={() => setHoveredButton("logout")}
            onMouseLeave={() => setHoveredButton(null)}
            className={`relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 w-full transition-all duration-300 font-semibold transform hover:from-red-600 hover:to-red-700 active:scale-95 ${
              hoveredButton === "logout" ? "animate-pulse" : ""
            }`}
          >
            <span className="relative z-10">Logout</span>
            <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 hover:left-[100%]"></div>
            <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-300 hover:scale-100"></div>
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <LogoutConfirm onClose={() => setShowLogoutConfirm(false)} />
      )}
    </div>
  );
};

export function Menubtn({
  btnname,
  to,
  icon,
  hoveredButton,
  setHoveredButton,
  gradient,
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      onMouseEnter={() => setHoveredButton(btnname)}
      onMouseLeave={() => setHoveredButton(null)}
      className={`relative overflow-hidden bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 w-full transition-all duration-300 font-semibold flex items-center gap-3 ${
        hoveredButton === btnname ? "animate-pulse" : ""
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon} {btnname}
      </span>
      <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-all duration-700 hover:left-[100%]"></div>
      <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-300 hover:scale-100"></div>
    </button>
  );
}

function LogoutConfirm({ onClose }) {
  const navigate = useNavigate();
  const confirmLogout = async () => {
    try {
      await auth.signOut();
      navigate("/landing");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-30 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center w-[90%] max-w-sm transform transition-all scale-100 animate-bounce-in border">
        <div className="mb-4">
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800 animate-fadeIn">
          Confirm Logout
        </h3>
        <p className="mb-6 text-gray-600 text-sm sm:text-base animate-fadeIn delay-200">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-center gap-4 animate-fadeIn delay-300">
          <button
            onClick={confirmLogout}
            className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:scale-105 hover:from-red-600 hover:to-red-700 active:scale-95"
          >
            <span className="relative z-10">Yes</span>
            <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-xl transition-transform duration-300 hover:scale-100"></div>
          </button>
          <button
            onClick={onClose}
            className="relative overflow-hidden bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:scale-105 hover:from-gray-600 hover:to-gray-700 active:scale-95"
          >
            <span className="relative z-10">No</span>
            <div className="absolute inset-0 bg-white/20 transform scale-0 rounded-xl transition-transform duration-300 hover:scale-100"></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mainmenu;
