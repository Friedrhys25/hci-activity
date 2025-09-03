import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg"; // ✅ background import

const Calculatorpage = () => {
  const [input, setInput] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        // Replace user-friendly symbols with JS operators before eval
        const expression = input
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/./g, ".")
          .replace(/−/g, "-");
        setInput(eval(expression).toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "Exit") {
      setShowExitConfirm(true); // ✅ show modal instead of window.confirm
    } else {
      setInput(input + value);
    }
  };

  // ✅ User-friendly symbols
  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "−",
    "0", ".", "=", "+",
    "C", "Exit"
  ];

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 w-96">
        {/* Display */}
        <div className="bg-gray-200/70 rounded-lg p-4 mb-4 text-right text-2xl font-mono break-words">
          {input || "0"}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => {
            let btnClass =
              "rounded-lg py-4 text-xl font-bold transition ";

            if (!isNaN(btn) || btn === ".") {
              // Digits → Green
              btnClass += "bg-emerald-600 text-white hover:bg-emerald-700";
            } else if (btn === "Exit") {
              // Exit → Red
              btnClass += "bg-red-600 text-white hover:bg-red-700 col-span-3";
            } else if (btn === "C") {
              // Clear → Gray
              btnClass += "bg-gray-500 text-white hover:bg-gray-600";
            } else {
              // Operators (=, ÷, ×, −, +) → Orange
              btnClass += "bg-orange-500 text-white hover:bg-orange-600";
            }

            return (
              <button
                key={index}
                onClick={() => handleClick(btn)}
                className={btnClass}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white backdrop-blur-lg p-6 rounded-xl shadow-2xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Exit</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to exit?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/mainmenu")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculatorpage;
