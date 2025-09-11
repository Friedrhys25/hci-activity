import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg";

const Unitconverter = () => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("centimeters");
  const [result, setResult] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const navigate = useNavigate();

  const units = {
    length: ["meters", "kilometers", "centimeters", "inches", "feet", "miles", "yards"],
    weight: ["kilograms", "grams", "pounds", "ounces"],
    time: ["hours", "minutes", "seconds", "milliseconds", "days", "weeks"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    volume: ["liters", "milliliters", "gallons", "cups"],
    area: ["squareMeters", "squareFeet", "hectares", "acres"],
    speed: ["mps", "kph", "mph"],
  };

  const toBase = {
    meters: (v) => v,
    kilometers: (v) => v * 1000,
    centimeters: (v) => v * 0.01,
    inches: (v) => v * 0.0254,
    feet: (v) => v * 0.3048,
    miles: (v) => v * 1609.34,
    yards: (v) => v * 0.9144,
    kilograms: (v) => v,
    grams: (v) => v / 1000,
    pounds: (v) => v * 0.453592,
    ounces: (v) => v * 0.0283495,
    hours: (v) => v * 3600,
    minutes: (v) => v * 60,
    seconds: (v) => v,
    milliseconds: (v) => v / 1000,
    days: (v) => v * 86400,
    weeks: (v) => v * 604800,
    celsius: (v) => v,
    fahrenheit: (v) => ((v - 32) * 5) / 9,
    kelvin: (v) => v - 273.15,
    liters: (v) => v,
    milliliters: (v) => v / 1000,
    gallons: (v) => v * 3.78541,
    cups: (v) => v * 0.236588,
    squareMeters: (v) => v,
    squareFeet: (v) => v * 0.092903,
    hectares: (v) => v * 10000,
    acres: (v) => v * 4046.86,
    mps: (v) => v,
    kph: (v) => v / 3.6,
    mph: (v) => v * 0.44704,
  };

  const fromBase = {
    meters: (v) => v,
    kilometers: (v) => v / 1000,
    centimeters: (v) => v / 0.01,
    inches: (v) => v / 0.0254,
    feet: (v) => v / 0.3048,
    miles: (v) => v / 1609.34,
    yards: (v) => v / 0.9144,
    kilograms: (v) => v,
    grams: (v) => v * 1000,
    pounds: (v) => v / 0.453592,
    ounces: (v) => v / 0.0283495,
    hours: (v) => v / 3600,
    minutes: (v) => v / 60,
    seconds: (v) => v,
    milliseconds: (v) => v * 1000,
    days: (v) => v / 86400,
    weeks: (v) => v / 604800,
    celsius: (v) => v,
    fahrenheit: (v) => (v * 9) / 5 + 32,
    kelvin: (v) => v + 273.15,
    liters: (v) => v,
    milliliters: (v) => v * 1000,
    gallons: (v) => v / 3.78541,
    cups: (v) => v / 0.236588,
    squareMeters: (v) => v,
    squareFeet: (v) => v / 0.092903,
    hectares: (v) => v / 10000,
    acres: (v) => v / 4046.86,
    mps: (v) => v,
    kph: (v) => v * 3.6,
    mph: (v) => v / 0.44704,
  };

  const convert = () => {
    let value = parseFloat(input);
    if (isNaN(value)) {
      setResult("Invalid input");
      return;
    }

    const baseValue = toBase[fromUnit](value);
    const converted = fromBase[toUnit](baseValue);
    const formatted = Number.isInteger(converted) ? converted : parseFloat(converted.toFixed(6));
    setResult(`${value} ${fromUnit} = ${formatted} ${toUnit}`);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  return (
    <div
      className="min-h-screen w-screen flex justify-center items-start bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Container Zoom on Hover */}
      <div className="bg-white bg-opacity-90 shadow-lg rounded-2xl p-8 flex flex-col items-center w-96 mt-12 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Unit Converter</h1>

        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
          className="border p-2 rounded w-full mb-3 transition duration-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setFromUnit(units[e.target.value][0]);
            setToUnit(units[e.target.value][1]);
          }}
          className="border p-2 rounded w-full mb-3 transition duration-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          <option value="length">Length / Distance</option>
          <option value="weight">Weight / Mass</option>
          <option value="time">Time</option>
          <option value="temperature">Temperature</option>
          <option value="volume">Volume</option>
          <option value="area">Area</option>
          <option value="speed">Speed</option>
        </select>

        <div className="flex gap-3 mb-3 items-center w-full">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="border p-2 rounded w-full transition duration-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {units[category].map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          <button
            onClick={swapUnits}
            className="bg-blue-500 text-white px-3 py-2 rounded transform transition duration-300 hover:scale-110 hover:shadow-lg hover:bg-blue-600"
          >
            ⇆
          </button>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="border p-2 rounded w-full transition duration-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {units[category].map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <button
          onClick={convert}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg w-full font-bold transform transition duration-300 hover:scale-110 hover:shadow-lg hover:bg-emerald-700"
        >
          Convert
        </button>

        {result && <p className="mt-4 text-lg font-medium transition duration-500 ease-in-out">{result}</p>}

        <button
          onClick={() => setShowExitConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg w-full font-bold transform transition duration-300 hover:scale-110 hover:shadow-lg hover:bg-red-700 mt-3"
        >
          Exit
        </button>
      </div>

      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 z-30">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xs text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Exit</h2>
            <p className="mb-6 text-gray-700 text-sm">Are you sure you want to exit?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate("/mainmenu")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg transform transition duration-300 hover:scale-110 hover:shadow-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg transform transition duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-500"
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
