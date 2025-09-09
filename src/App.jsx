import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landingpage from "./components/Landingpage";
import Mainmenu from "./components/Mainmenu";
import Calculatorpage from "./components/Calculatorpage";
import Gradecheckerpage from "./components/Gradecheckerpage";
import Todolistpage from "./components/Todolistpage";
import Unitconverter from "./components/Unitconverter";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Mainmenu */}
        <Route
          path="/mainmenu"
          element={
            <ProtectedRoute>
              <Mainmenu />
            </ProtectedRoute>
          }
        />

        <Route path="/calculator" element={<Calculatorpage />} />
        <Route path="/gradechecker" element={<Gradecheckerpage />} />
        <Route path="/todolist" element={<Todolistpage />} />
        <Route path="/unitcon" element={<Unitconverter />} />
      </Routes>
    </Router>
  );
}

export default App;
