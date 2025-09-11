import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg";
import { db } from "../firebase";
import { ref, push, onValue, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Calculatorpage = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]); 
  const [userId, setUserId] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  // ✅ Check logged-in user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Load calc history from DB
  useEffect(() => {
    if (!userId) return;
    const calcRef = ref(db, `users/${userId}/history/calcHistory`);
    onValue(calcRef, (snapshot) => {
      const data = snapshot.val();
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

  // ✅ Clear all history
  const clearHistory = () => {
    if (!userId) return;
    const calcRef = ref(db, `users/${userId}/history/calcHistory`);
    remove(calcRef); // clears history from Firebase
    setHistory([]);  // clears local state
  };

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
        const finalResult = Number(result).toString();
        setInput(finalResult);

        // ✅ Save to Firebase
        if (userId) {
          const calcRef = ref(db, `users/${userId}/history/calcHistory`);
          push(calcRef, {
            expression: input,
            result: finalResult,
            timestamp: Date.now(),
          });
        }
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
      className="min-h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Main Container - Side by side layout */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-4xl justify-center items-start lg:items-center">
        
        {/* Calculator Box */}
        <div className="bg-white/90 shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md flex flex-col space-y-4">
          
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

        {/* ✅ History Box */}
        <div className="w-full max-w-sm bg-white/90 rounded-2xl shadow-lg p-4 h-fit lg:max-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-800">📜 History</h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 font-semibold hover:text-red-800 transition"
              >
                Clear
              </button>
            )}
          </div>

          <div className="max-h-80 lg:max-h-96 overflow-y-auto space-y-2">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No history yet.</p>
            ) : (
              history.map((record) => (
                <div key={record.id} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg shadow-sm">
                  <span className="text-sm font-mono truncate pr-2">{record.expression} =</span>
                  <span className="font-bold text-emerald-600 flex-shrink-0">{record.result}</span>
                </div>
              ))
            )}
          </div>
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
