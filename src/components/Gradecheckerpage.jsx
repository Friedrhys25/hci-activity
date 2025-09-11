import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg";
import Navbar from "./Navbar";

const Gradecheckerpage = () => {
  const [subjectCount, setSubjectCount] = useState("");
  const [grades, setGrades] = useState([]);
  const [gwa, setGwa] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubjectCount = () => {
    const count = parseInt(subjectCount);
    if (isNaN(count) || count <= 0) {
      alert("⚠️ Please enter a valid number of subjects.");
      return;
    }
    setGrades(new Array(count).fill(""));
    setGwa(null);
    setRemarks("");
  };

  const handleGradeChange = (index, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = value;
    setGrades(updatedGrades);
  };

  const calculateGWA = () => {
    const numericGrades = grades.map((g) => parseFloat(g));
    if (numericGrades.some(isNaN)) {
      alert("❌ Please enter valid numeric grades for all subjects.");
      return;
    }

    const sum = numericGrades.reduce((a, b) => a + b, 0);
    const average = sum / numericGrades.length;
    setGwa(average.toFixed(2));

    if (average < 75) setRemarks("❌ Failed");
    else if (average >= 90) setRemarks("🏆 Excellent");
    else if (average >= 80) setRemarks("👍 Very Good");
    else setRemarks("✅ Passed");
  };

  return (
    <div
      className="min-h-screen w-screen flex justify-center items-center bg-cover bg-center animate-fadeIn"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/90 shadow-2xl rounded-3xl p-6 sm:p-8 w-[90%] max-w-sm sm:max-w-md flex flex-col space-y-4 transform transition duration-500 scale-95 hover:scale-100">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-700 mb-4 animate-fadeInDown">
           GWA Calculator
        </h1>

        {/* Step 1 */}
        <div className="flex flex-col space-y-2 animate-fadeInUp delay-100">
          <label className="font-semibold text-sm sm:text-base">Step 1: Enter number of subjects</label>
          <input
            type="number"
            value={subjectCount}
            onChange={(e) => setSubjectCount(e.target.value)}
            placeholder="e.g. 5"
            className="border rounded-lg w-full px-3 sm:px-4 py-2 text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
          />
          <button
            onClick={handleSubjectCount}
            className="bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
          >
            Confirm Subjects
          </button>
        </div>

        {/* Step 2 */}
        {grades.length > 0 && (
          <div className="flex flex-col space-y-2 animate-fadeInUp delay-200">
            <label className="font-semibold text-sm sm:text-base">Step 2: Enter your grades</label>
            {grades.map((grade, index) => (
              <input
                key={index}
                type="number"
                value={grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
                placeholder={`Grade for subject ${index + 1}`}
                className="border rounded-lg w-full px-3 sm:px-4 py-2 text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              />
            ))}
            <button
              onClick={calculateGWA}
              className="bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700 transform hover:scale-105 transition duration-300"
            >
              Calculate GWA
            </button>
          </div>
        )}

        {/* Step 3: Result */}
        {gwa && (
          <div className="mt-4 text-center animate-fadeInUp delay-300">
            <h2 className="text-lg sm:text-xl font-bold">
               Your GWA: <span className="text-emerald-700">{gwa}</span>
            </h2>
            <p className="mt-1 text-sm sm:text-base font-semibold">{remarks}</p>
          </div>
        )}

        {/* Exit Button */}
        <button
          onClick={() => setShowExitConfirm(true)}
          className="mt-4 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transform hover:scale-105 transition duration-300"
        >
          Exit
        </button>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-30 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xs text-center animate-slideUp">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Confirm Exit</h2>
            <p className="mb-6 text-gray-700 text-sm sm:text-base">
              Are you sure you want to exit?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
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

export default Gradecheckerpage;
