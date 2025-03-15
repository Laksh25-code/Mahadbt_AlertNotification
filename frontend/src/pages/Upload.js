// It is a logic for UploadFile.js 

import React, { useState } from "react";
import Footer from "../components/Footer";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handles file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handles file upload action (to be connected with backend)
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    alert(`File "${selectedFile.name}" uploaded successfully!`);
    // Backend API call can be implemented here
  };

  return (
    <>
    <div className="container mt-5">
      <h2 className="text-center text-primary">Upload File</h2>
      
      <div className="card p-4 shadow-sm">
        <label className="form-label">Select File (Excel, PDF)</label>
        <input 
          type="file" 
          className="form-control mb-3" 
          accept=".xls,.xlsx,.pdf" 
          onChange={handleFileChange} 
        />
        
        {selectedFile && (
          <p className="text-success">Selected File: {selectedFile.name}</p>
        )}

        <button 
          className="btn btn-success w-100" 
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default Upload;