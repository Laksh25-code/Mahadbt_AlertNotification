import React, { useState } from 'react';
//import axios from "axios";
import Navbar from "./Navbar";
import Footer from "../components/Footer";

const UploadFile = () => {
    const [file, setFile] = useState(null);
    // const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
          alert("Please select a file first!");
          return;
        }
      
        const formData = new FormData();
        formData.append("file", file);
      
        try {
          const response = await fetch("http://127.0.0.1:5000/api/upload", {
            method: "POST",
            body: formData,
          });
      
          const result = await response.json();
          alert(result.message || result.error);
        } catch (error) {
          alert("File upload failed.");
        }
      };
      

    return (
        <>
              <Navbar />
        
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="p-4"style={{ width: "700px", height:"300px"}}>
                        <h2>Upload Rejection List</h2>
                        <hr/>
                        <input
                        type="file"
                        onChange={handleFileChange}
                        className="form-control mb-3"
                        />
                        <button onClick={handleUpload} className="btn btn-dark">
                        Upload
                        </button>
                    </div>
                </div>
                
                <Footer/>
            </>
    );
};

export default UploadFile;
