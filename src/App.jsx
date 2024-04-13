import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadButton from "./pages/UploadButton";
import ChatTest from "./pages/ChatTest";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadButton />} />
          <Route path="/ChatTest" element={<ChatTest />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
