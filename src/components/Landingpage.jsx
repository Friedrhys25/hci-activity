import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg"; // ✅ fixed path
import Navbar from "./Navbar";

const Landingpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ new state
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

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
        navigate("/mainmenu");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error, try again later.");
    }
  };

  const handleSendCode = () => {
    setCodeSent(true);
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </div>
      {/* Login Box */}
      <div className="bg-white/80 backdrop-blur-md shadow-2xl border rounded-2xl p-8 w-96">
        <h2 className="text-xl font-bold mb-4">Welcome Student</h2>

        <form className="mb-3" onSubmit={handleLogin}>
          <p className="ml-1">Username</p>
          <input
            className="border rounded-md w-full mb-2 p-1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p className="ml-1">Password</p>
          <div className="relative mb-2">
            <input
              className="border rounded-md w-full p-1 pr-12"
              type={showPassword ? "text" : "password"} // ✅ toggle input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 hover:text-emerald-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Forget Password link */}
          <button
            type="button"
            className="text-sm text-black underline hover:text-emerald-600 hover:underline-offset-2"
            onClick={() => setShowForgot(true)}
          >
            Forget password?
          </button>

          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 w-full mt-2"
          >
            Login
          </button>
        </form>

        {message && <p className="text-center mt-2">{message}</p>}
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-3">Reset Password</h3>
            {!codeSent ? (
              <>
                <p className="text-sm mb-2">
                  Enter your email to receive a verification code:
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border rounded-md w-full mb-3 p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="bg-emerald-600 text-white w-full py-2 rounded-lg hover:bg-emerald-700"
                  onClick={handleSendCode}
                >
                  Send Verification Code
                </button>
              </>
            ) : (
              <>
                <p className="text-sm mb-2">
                  A verification code has been sent to <b>{email}</b>.
                </p>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className="border rounded-md w-full mb-3 p-2"
                />
                <button className="bg-emerald-600 text-white w-full py-2 rounded-lg hover:bg-emerald-700">
                  Verify Code
                </button>
              </>
            )}
            <button
              className="mt-3 text-gray-500 underline text-sm"
              onClick={() => setShowForgot(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landingpage;
