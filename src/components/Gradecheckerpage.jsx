import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg"; // ✅ background import

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

    if (average < 75) {
      setRemarks("❌ Failed");
    } else if (average >= 90) {
      setRemarks("🏆 Excellent");
    } else if (average >= 80) {
      setRemarks("👍 Very Good");
    } else {
      setRemarks("✅ Passed");
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Main Container */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-4 sm:p-6 w-[90%] max-w-sm sm:max-w-md text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">GWA Calculator</h1>

        {/* Step 1: Enter number of subjects */}
        <input
          type="number"
          value={subjectCount}
          onChange={(e) => setSubjectCount(e.target.value)}
          placeholder="Enter number of subjects"
          className="border rounded-lg w-full px-3 sm:px-4 py-2 mb-3 text-center text-sm sm:text-base"
        />
        <button
          onClick={handleSubjectCount}
          className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg w-full font-bold hover:bg-blue-700 transition mb-4 text-sm sm:text-base"
        >
          Confirm Subjects
        </button>

        {/* Step 2: Enter grades */}
        {grades.length > 0 && (
          <div>
            {grades.map((grade, index) => (
              <input
                key={index}
                type="number"
                value={grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
                placeholder={`Enter grade for subject ${index + 1}`}
                className="border rounded-lg w-full px-3 sm:px-4 py-2 mb-2 text-center text-sm sm:text-base"
              />
            ))}

            <button
              onClick={calculateGWA}
              className="bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg w-full font-bold hover:bg-emerald-700 transition mt-2 text-sm sm:text-base"
            >
              Calculate GWA
            </button>
          </div>
        )}

        {/* Step 3: Show result */}
        {gwa && (
          <div className="mt-4 text-base sm:text-lg font-semibold">
            🎓 Your GWA is: <span className="font-bold">{gwa}</span>
            <div className="mt-2">{remarks}</div>
          </div>
        )}

        {/* Exit Button */}
        <button
          onClick={() => setShowExitConfirm(true)}
          className="mt-6 bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg w-full font-bold hover:bg-red-600 transition text-sm sm:text-base"
        >
          Exit
        </button>
      </div>

      {/* Exit Confirmation Modal */}
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

export default Gradecheckerpage;
