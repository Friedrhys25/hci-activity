import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg"; // ✅ background image import

const Todolistpage = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false); // ✅ for modal
  const navigate = useNavigate();

  // ✅ Load tasks from localStorage (Smart To-do List)
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // ✅ Save tasks to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  // Toggle done/undone
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Clear all tasks
  const clearTasks = () => {
    if (window.confirm("Clear all tasks?")) {
      setTasks([]);
    }
  };

  // Exit button opens modal
  const handleExit = () => {
    setShowExitConfirm(true);
  };

  // Confirm exit
  const confirmExit = () => {
    setShowExitConfirm(false);
    navigate("/mainmenu");
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Smart To-Do List</h1>

        {/* Input field */}
        <textarea
          id="todotext"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded-lg h-20 w-full mt-2 p-2"
          placeholder="Write your task here..."
        ></textarea>

        {/* Buttons */}
        <div className="flex flex-row justify-between gap-2">
          <button
            onClick={addTask}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-emerald-700 transition mt-3"
          >
            Add
          </button>

          <button
            onClick={clearTasks}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-gray-700 transition mt-3"
          >
            Clear
          </button>
        </div>

        {/* Task list */}
        <ul className="mt-4 text-left max-h-40 overflow-y-auto">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white shadow px-3 py-2 mb-2 rounded-lg"
            >
              <span
                onClick={() => toggleTask(index)}
                className={`cursor-pointer w-full ${
                  task.done ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="ml-2 text-red-500 font-bold hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Exit button */}
        <button
          onClick={handleExit}
          className="bg-red-600 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-red-700 transition mt-5"
        >
          Exit
        </button>
      </div>

      {/* ✅ Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-3">Confirm Exit</h3>
            <p className="mb-4">Are you sure you want to exit?</p>
            <div className="flex justify-around">
              <button
                onClick={confirmExit}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Yes, Exit
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todolistpage;
