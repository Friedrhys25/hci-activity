// Todolistpage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, push, onValue, remove, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import bgImage from "../Image/1.jpg";

const Todolistpage = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // ✅ Check logged-in user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("/login"); // redirect if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Fetch tasks from this user's history
  useEffect(() => {
    if (!userId) return;

    const tasksRef = ref(db, `users/${userId}/history/todohis`);
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const taskList = Object.entries(data).map(([id, task]) => ({
          id,
          ...task,
        }));
        setTasks(taskList);
      } else {
        setTasks([]);
      }
    });
  }, [userId]);

  // ✅ Add task
  const addTask = () => {
    if (input.trim() === "" || date.trim() === "") return;

    const tasksRef = ref(db, `users/${userId}/history/todohis`);
    push(tasksRef, {
      text: input,
      date: date,
      done: false,
    });

    setInput("");
    setDate("");
  };

  // ✅ Toggle task (done/undone)
  const toggleTask = (taskId, currentStatus) => {
    const taskRef = ref(db, `users/${userId}/history/todohis/${taskId}`);
    update(taskRef, { done: !currentStatus });
  };

  // ✅ Delete task
  const deleteTask = (taskId) => {
    const taskRef = ref(db, `users/${userId}/history/todohis/${taskId}`);
    remove(taskRef);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-6 w-11/12 max-w-md animate-fadeInUp">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          📝 Todo List
        </h1>

        {/* Input fields */}
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-400"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-400"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={() => navigate("/mainmenu")}>
            Exit
          </button>
        </div>

        {/* Task List */}
        <ul className="mt-4 text-left max-h-64 overflow-y-auto space-y-2 animate-fadeInUp delay-300">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow px-3 py-2 rounded-lg"
            >
              <div
                onClick={() => toggleTask(task.id, task.done)}
                className={`cursor-pointer w-full text-sm sm:text-base md:text-lg ${
                  task.done ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {task.text}
                <div className="text-xs text-gray-500">📅 {task.date}</div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-0 sm:ml-2 text-red-500 font-bold hover:text-red-700 text-lg mt-2 sm:mt-0 transition-transform transform hover:scale-110"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolistpage;
