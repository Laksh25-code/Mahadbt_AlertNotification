import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Used in UI now
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/upload");
        alert("Login successfully");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="p-4 border rounded shadow bg-dark" style={{ width: "450px", height: "320px" }}>
          <h2 className="text-center mb-3 text-light">Admin Login</h2>
          {error && <p className="text-danger text-center">{error}</p>} {/* Display Error */}
          <input
            type="text"
            placeholder="Username"
            className="form-control mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="btn btn-success w-100">Login</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
