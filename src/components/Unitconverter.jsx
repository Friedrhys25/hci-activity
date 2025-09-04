import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import bgImage from "../Image/1.jpg"; // ✅ background image

const Unitconverter = () => {
  const [input, setInput] = useState("");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("centimeters");
  const [result, setResult] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false); // ✅ state for modal

  const navigate = useNavigate();

  const convert = () => {
    let value = parseFloat(input);
    if (isNaN(value)) {
      setResult("Invalid input");
      return;
    }

    // Convert input to meters first
    let meters;
    if (fromUnit === "meters") meters = value;
    if (fromUnit === "centimeters") meters = value / 100;
    if (fromUnit === "kilometers") meters = value * 1000;

    // Convert from meters to target unit
    let converted;
    if (toUnit === "meters") converted = meters;
    if (toUnit === "centimeters") converted = meters * 100;
    if (toUnit === "kilometers") converted = meters / 1000;

    setResult(`${value} ${fromUnit} = ${converted} ${toUnit}`);
  };

  return (
    <div
      className="min-h-screen w-screen flex justify-center items-start bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Card container */}
      <div className="bg-white bg-opacity-90 shadow-lg rounded-2xl p-8 flex flex-col items-center w-96 mt-12">
        <h1 className="text-2xl font-bold mb-4">Unit Converter</h1>

        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
          className="border p-2 rounded w-full mb-3"
        />

        <div className="flex gap-3 mb-3">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="meters">Meters</option>
            <option value="centimeters">Centimeters</option>
            <option value="kilometers">Kilometers</option>
          </select>

          <span className="flex items-center">→</span>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="meters">Meters</option>
            <option value="centimeters">Centimeters</option>
            <option value="kilometers">Kilometers</option>
          </select>
        </div>

        <button
          onClick={convert}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 w-full mb-3"
        >
          Convert
        </button>

        {result && <p className="mt-4 text-lg font-medium">{result}</p>}

        {/* ✅ Exit button */}
        <button
          onClick={() => setShowExitConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full mt-6"
        >
          Exit
        </button>
      </div>

      {/* ✅ Exit Confirmation Modal */}
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

export default Unitconverter;
