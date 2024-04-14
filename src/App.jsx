import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadButton from "./pages/UploadButton";
import ChatTest from "./pages/ChatTest";
import Recruitermode from "./pages/Recruitermode";
import { useState } from "react";
import "tailwindcss/tailwind.css";

function App() {
  const [cvUrl, setCvUrl] = useState("");
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadButton />} />
          <Route path="/ChatTest" element={<ChatTest />} />
          <Route path="/recruitermode" element={<Recruitermode />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
