import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Gradecheckerpage = () => {
  const [grade, setGrade] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const checkGrade = () => {
    if (grade === "") {
      setResult("⚠️ Please enter a grade.");
      return;
    }

    const num = parseFloat(grade);

    if (isNaN(num)) {
      setResult("❌ Invalid grade! Enter a number.");
    } else if (num >= 90) {
      setResult(`🏆 Excellent! Your grade is ${num}`);
    } else if (num >= 80) {
      setResult(`👍 Very Good! Your grade is ${num}`);
    } else if (num >= 75) {
      setResult(`✅ Passed! Your grade is ${num}`);
    } else {
      setResult(`❌ Failed! Your grade is ${num}`);
    }
  };

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit?")) {
      navigate("/mainmenu");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Grade Checker</h1>

        {/* Input Field */}
        <input
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Enter your grade"
          className="border rounded-lg w-full px-3 py-2 mb-4 text-center"
        />

        {/* Check Button */}
        <button
          onClick={checkGrade}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-emerald-700 transition"
        >
          Check Grade
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 text-lg font-semibold">{result}</div>
        )}

        {/* Exit Button */}
        <button
          onClick={handleExit}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-red-600 transition"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Gradecheckerpage;
