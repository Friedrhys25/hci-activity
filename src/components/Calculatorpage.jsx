import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg";

const Calculatorpage = () => {
  const [input, setInput] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  const handleClick = (value) => {
    if (value === "C") setInput("");
    else if (value === "=") {
      try {
        let expression = input
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/−/g, "-")
          .replace(/√/g, "Math.sqrt")
          .replace(/x²/g, "**2");
        const result = eval(expression);
        setInput(Number(result).toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "%") {
      const num = parseFloat(input);
      if (!isNaN(num)) setInput((num / 100).toString());
    } else if (value === "√") setInput(Math.sqrt(parseFloat(input)).toString());
    else if (value === "x²") setInput((parseFloat(input) ** 2).toString());
    else if (value === "Exit") setShowExitConfirm(true);
    else setInput(input + value);
  };

  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "−",
    "0", ".", "=", "+",
    "C", "%", "√", "x²",
    "Exit"
  ];

  return (
    <div
      className="min-h-screen w-screen flex justify-center items-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/90 shadow-2xl rounded-3xl p-6 sm:p-8 w-[90%] max-w-sm sm:max-w-md flex flex-col space-y-4">
        
        {/* Display */}
        <div className="bg-gray-100 rounded-xl p-4 text-right text-2xl sm:text-3xl font-mono min-h-[3rem] break-words shadow-inner">
          {input || "0"}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, idx) => {
            let baseClass = "py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-full shadow-md hover:scale-105 transition-all duration-200";
            if (!isNaN(btn) || btn === ".") baseClass += " bg-emerald-600 text-white hover:bg-emerald-700";
            else if (btn === "Exit") baseClass += " bg-red-600 text-white col-span-4 hover:bg-red-700";
            else if (btn === "C") baseClass += " bg-gray-500 text-white hover:bg-gray-600";
            else if (btn === "%" || btn === "√" || btn === "x²") baseClass += " bg-purple-500 text-white hover:bg-purple-600";
            else baseClass += " bg-orange-500 text-white hover:bg-orange-600";

            return (
              <button key={idx} className={baseClass} onClick={() => handleClick(btn)}>
                {btn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exit Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-30">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xs text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Confirm Exit</h2>
            <p className="mb-6 text-gray-700 text-sm sm:text-base">
              Are you sure you want to exit?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/mainmenu")}
                className="w-full sm:w-auto bg-red-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-700 hover:scale-105 transition font-semibold"
              >
                Yes
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full sm:w-auto bg-gray-400 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-500 hover:scale-105 transition font-semibold"
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
