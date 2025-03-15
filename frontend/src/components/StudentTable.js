import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const StudentTable = ({ students: propStudents = [] }) => {
  console.log("Received Students:", propStudents); // ✅ Logging correct variable

  const [students, setStudents] = useState(propStudents);
  const [loading, setLoading] = useState(!propStudents.length); // Only show loading if no students are passed
  const [error, setError] = useState(null);

  // Fetch data only if students are not passed as props
  useEffect(() => {
    if (propStudents.length === 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/students"
          );
          setStudents(response.data);
        } catch (error) {
          console.error("Error fetching students:", error);
          setError("Failed to fetch student data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [propStudents]);

  // Function to send notifications
  const handleNotify = (student) => {
    console.log("Sending Notification to:", student);
  
    if (!student.phone_number) {  // ✅ Corrected field name
      alert("Error: Mobile number is missing");
      return;
    }
  
    const payload = {
      name: student.student_name || "Unknown",
      phone_number: student.phone_number,  
      email: student.email || "Unknown",
      reason: student.reason_for_denial || "Unknown",
    };
    
  
    console.log("Payload being sent:", payload);
  
    fetch("http://127.0.0.1:5000/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from API:", data);
        if (data.error) {
          alert("Error: " + data.error);
        } else {
          alert("Success: " + data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };
  

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2 className="mt-4 mb-4">Rejected Students</h2>

        {error && <p className="text-danger">{error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.application_id || "N/A"}</td>
                    <td>{student.student_name}</td> {/* Correct field name */}
                    <td>{student.phone_number}</td> {/* Correct field name */}
                    <td>{student.reason_for_denial}</td>{" "}
                    {/* Correct field name */}
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleNotify(student)}
                      >
                        Notify
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default StudentTable;
