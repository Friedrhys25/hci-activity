import { useNavigate } from "react-router-dom";
import bgImage from "../Image/1.jpg"; // ✅ fixed path
import Navbar from "./Navbar";

const Landingpage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/mainmenu");
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {/* Start Box */}
      <div className="bg-white/80 backdrop-blur-md shadow-2xl border rounded-2xl p-8 w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome Student</h2>

        <button
          onClick={handleStart}
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 w-full"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Landingpage;
