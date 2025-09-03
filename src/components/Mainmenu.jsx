import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg"; // ✅ background image

const Mainmenu = () => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-96 flex flex-col space-y-4">
        <h1 className="text-4xl font-bold mb-5 text-center">Menus</h1>

        <Menubtn btnname="1. Calculator" to="/calculator" />
        <Menubtn btnname="2. Grade checker" to="/gradechecker" />
        <Menubtn btnname="3. To-Do List" to="/todolist" />
        <Menubtn btnname="4. About us" to="/about" />
        <button
          onClick={() => setShowExitConfirm(true)}
          className="text-left pl-5 text-2xl font-bold bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition duration-300"
        >
          5. Exit
        </button>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && <ExitConfirm onClose={() => setShowExitConfirm(false)} />}
    </div>
  );
};

export function Menubtn({ btnname, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="text-left pl-5 text-2xl font-bold bg-emerald-600 text-white rounded-md p-2 hover:bg-emerald-700 transition duration-300"
    >
      {btnname}
    </button>
  );
}

// Exit confirmation box
function ExitConfirm({ onClose }) {
  const navigate = useNavigate();

  const confirmExit = () => {
    navigate("/"); // ✅ Go back to homepage/login
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white backdrop-blur-lg p-6 rounded-xl shadow-2xl w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Confirm Exit</h2>
        <p className="mb-6 text-gray-700">Are you sure you want to exit?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={confirmExit}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mainmenu;
