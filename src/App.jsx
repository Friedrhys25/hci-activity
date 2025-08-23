import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landingpage from "./components/Landingpage";
import Mainmenu from "./components/Mainmenu";
import Calculatorpage from "./components/Calculatorpage";
import Gradecheckerpage from "./components/Gradecheckerpage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/mainmenu" element={<Mainmenu />} />
        <Route path="/calculator" element={<Calculatorpage />} />
          <Route path="/gradechecker" element={<Gradecheckerpage />} />

      </Routes>
    </Router>
  );
}

export default App;
