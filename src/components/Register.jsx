import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate email & password
    if (!emailRegex.test(form.email)) {
      return setError("❌ Invalid email format");
    }
    if (!passwordRegex.test(form.password)) {
      return setError("❌ Password must be 6+ chars, include uppercase, number & symbol");
    }

    try {
      // ✅ Register user
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);

      // ✅ Update displayName in Firebase Auth
      await updateProfile(userCred.user, { displayName: form.username });

      // ✅ Add user to Realtime Database with default history
      await set(ref(db, "users/" + userCred.user.uid), {
        username: form.username,
        email: form.email,
        calculatorhis: [],
        unitconverthis: [],
        todolist: []
      });

      navigate("/mainmenu");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="bg-emerald-600 text-white w-full py-2 rounded hover:bg-emerald-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
