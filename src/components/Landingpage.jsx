import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./Navbar";

const Landingpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        navigate("/mainmenu"); // Navigate to the Mainmenu page
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error, try again later.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center bg-gray-100">
      <Navbar />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 self-center">
        <h2 className="text-xl font-bold mb-4">Welcome Admin</h2>

        <form className="mb-3" onSubmit={handleLogin}>
          <p className="ml-1">Username</p>
          <input
            className="border rounded-md w-full mb-2 p-1"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p className="ml-1">Password</p>
          <input
            className="border rounded-md w-full mb-2 p-1"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 w-full mt-2"
          >
            Login
          </button>
        </form>

        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Landingpage;