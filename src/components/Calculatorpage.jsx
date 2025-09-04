import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg";

const Calculatorpage = () => {
  const [input, setInput] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        // Replace symbols with JS operators
        let expression = input
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/−/g, "-")
          .replace(/√/g, "Math.sqrt")
          .replace(/x²/g, "**2");

        // Evaluate expression
        const result = eval(expression);
        setInput(Number(result).toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "%") {
      // Convert current input to percent
      try {
        const num = parseFloat(input);
        if (!isNaN(num)) {
          setInput((num / 100).toString());
        }
      } catch {
        setInput("Error");
      }
    } else if (value === "√") {
      setInput(Math.sqrt(parseFloat(input)).toString());
    } else if (value === "x²") {
      setInput((parseFloat(input) ** 2).toString());
    } else if (value === "Exit") {
      setShowExitConfirm(true);
    } else {
      setInput(input + value);
    }
  };



  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "−",
    "0", ".", "=", "+",
    "C", "%", "√", "x²"
    ,"Exit"
  ];

  return (
    <div
      className="min-h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-4 sm:p-6 w-[90%] max-w-sm sm:max-w-md">
        <div className="bg-gray-200/70 rounded-lg p-3 sm:p-4 mb-4 text-right text-xl sm:text-2xl font-mono break-words min-h-[3rem]">
          {input || "0"}
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {buttons.map((btn, index) => {
            let btnClass = "rounded-lg py-3 sm:py-4 text-lg sm:text-xl font-bold transition ";

            if (!isNaN(btn) || btn === ".") {
              btnClass += "bg-emerald-600 text-white hover:bg-emerald-700";
            } else if (btn === "Exit") {
              btnClass += "bg-red-600 text-white hover:bg-red-700 col-span-4";
            } else if (btn === "C") {
              btnClass += "bg-gray-500 text-white hover:bg-gray-600";
            } else if (btn === "%" || btn === "√" || btn === "x²") {
              btnClass += "bg-purple-500 text-white hover:bg-purple-600";
            } else {
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

      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white backdrop-blur-lg p-6 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Confirm Exit</h2>
            <p className="mb-6 text-gray-700 text-sm sm:text-base">
              Are you sure you want to exit?
            </p>
            <div className="flex justify-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/mainmenu")}
                className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
              >
                Yes
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="bg-gray-400 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-500 transition text-sm sm:text-base"
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
