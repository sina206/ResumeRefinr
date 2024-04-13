import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadButton from "./pages/UploadButton";
import Recruitermode from "./pages/Recruitermode";


function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadButton />} />
          <Route path="/recruitermode" element={<Recruitermode />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
