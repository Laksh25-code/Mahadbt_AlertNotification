import { useState, useEffect } from "react";
import axios from "axios";
import StudentTable from "../components/StudentTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Display = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/students")
      .then((response) => {
        console.log("Fetched students:", response.data); // Debugging line
        setStudents(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);
    
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <StudentTable students={students} />
      </div>
      <Footer />
    </>
  );
};

export default Display;
