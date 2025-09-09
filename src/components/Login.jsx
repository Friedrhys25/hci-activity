import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(form.email)) {
      return setError("❌ Invalid email format");
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/mainmenu");
    } catch (err) {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email"
            onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="password" name="password" placeholder="Password"
            onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="bg-emerald-600 text-white w-full py-2 rounded hover:bg-emerald-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
