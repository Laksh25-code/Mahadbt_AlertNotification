import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import UploadFile from "./components/UploadFile";
import Display from "./pages/Display";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>
  );
};


export default App;

/* 
Replace hardcoded credentials with backend authentication.
Ensure StudentTable.js and Display.js fetch from the backend.
Set up backend routes (/api/upload, /api/students) accordingly.*/