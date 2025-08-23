import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Calculatorpage = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // Handle button clicks
  const handleClick = (value) => {
    if (value === "C") {
      setInput(""); // Clear input
    } else if (value === "=") {
      try {
        setInput(eval(input).toString()); // Evaluate expression
      } catch {
        setInput("Error");
      }
    } else if (value === "Exit") {
      const confirmed = window.confirm("Are you sure you want to exit?");
      if (confirmed) {
        navigate("/mainmenu");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C", "Exit"
  ];

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="mt-15 bg-white shadow-lg rounded-2xl p-6 w-96">
        {/* Display */}
        <div className="bg-gray-200 rounded-lg p-4 mb-4 text-right text-2xl font-mono">
          {input || "0"}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleClick(btn)}
              className="bg-emerald-600 text-white rounded-lg py-4 text-xl font-bold hover:bg-emerald-700 transition"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculatorpage;
