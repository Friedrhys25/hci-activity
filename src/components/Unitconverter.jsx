import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg";
import { db } from "../firebase";
import { ref, push, onValue, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Unitconverter = () => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("centimeters");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]); // ✅ conversion history
  const [userId, setUserId] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const navigate = useNavigate();

  // ✅ Units
  const units = {
    length: ["meters", "kilometers", "centimeters", "inches", "feet", "miles", "yards"],
    weight: ["kilograms", "grams", "pounds", "ounces"],
    time: ["hours", "minutes", "seconds", "milliseconds", "days", "weeks"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    volume: ["liters", "milliliters", "gallons", "cups"],
    area: ["squareMeters", "squareFeet", "hectares", "acres"],
    speed: ["mps", "kph", "mph"],
  };

  // ✅ Conversion logic
  const toBase = { /* same as before */ 
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

  const fromBase = { /* same as before */ 
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

  // ✅ Check logged-in user
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  // ✅ Load conversion history
  useEffect(() => {
    if (!userId) return;
    const convRef = ref(db, `users/${userId}/history/unitHistory`);
    onValue(convRef, (snap) => {
      const data = snap.val();
      if (data) {
        const records = Object.entries(data).map(([id, record]) => ({
          id,
          ...record,
        }));
        records.sort((a, b) => b.timestamp - a.timestamp);
        setHistory(records);
      } else {
        setHistory([]);
      }
    });
  }, [userId]);

  // ✅ Clear history
  const clearHistory = () => {
    if (!userId) return;
    const convRef = ref(db, `users/${userId}/history/unitHistory`);
    remove(convRef);
    setHistory([]);
  };

  // ✅ Convert and Save
  const convert = () => {
    let value = parseFloat(input);
    if (isNaN(value)) {
      setResult("Invalid input");
      return;
    }

    const baseValue = toBase[fromUnit](value);
    const converted = fromBase[toUnit](baseValue);
    const formatted = Number.isInteger(converted)
      ? converted
      : parseFloat(converted.toFixed(6));

    const conversionResult = `${value} ${fromUnit} = ${formatted} ${toUnit}`;
    setResult(conversionResult);

    // ✅ Save to Firebase
    if (userId) {
      const convRef = ref(db, `users/${userId}/history/unitHistory`);
      push(convRef, {
        input: value,
        fromUnit,
        toUnit,
        result: formatted,
        timestamp: Date.now(),
      });
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  return (
    <div
      className="min-h-screen w-screen flex flex-col lg:flex-row justify-center items-start bg-cover bg-center p-6 gap-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Converter Box */}
      <div className="bg-white bg-opacity-90 shadow-lg rounded-2xl p-8 flex flex-col items-center w-96 mt-12 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Unit Converter</h1>

        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
          className="border p-2 rounded w-full mb-3"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setFromUnit(units[e.target.value][0]);
            setToUnit(units[e.target.value][1]);
          }}
          className="border p-2 rounded w-full mb-3"
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
            className="border p-2 rounded w-full"
          >
            {units[category].map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          <button
            onClick={swapUnits}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            ⇆
          </button>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="border p-2 rounded w-full"
          >
            {units[category].map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <button
          onClick={convert}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg w-full font-bold"
        >
          Convert
        </button>

        {result && <p className="mt-4 text-lg font-medium">{result}</p>}

        <button
          onClick={() => setShowExitConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg w-full font-bold mt-3"
        >
          Exit
        </button>
      </div>

      {/* ✅ History Box */}
      <div className="w-full max-w-sm bg-white/90 rounded-2xl shadow-lg p-4 h-fit lg:max-h-[500px] mt-12 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">📜 History</h2>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-red-600 font-semibold hover:text-red-800"
            >
              Clear
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2">
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No history yet.</p>
          ) : (
            history.map((h) => (
              <div
                key={h.id}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg shadow-sm"
              >
                <span className="text-sm font-mono truncate pr-2">
                  {h.input} {h.fromUnit} →
                </span>
                <span className="font-bold text-emerald-600 flex-shrink-0">
                  {h.result} {h.toUnit}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Exit Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-30">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xs text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Exit</h2>
            <p className="mb-6 text-gray-700 text-sm">Are you sure you want to exit?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate("/mainmenu")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
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
