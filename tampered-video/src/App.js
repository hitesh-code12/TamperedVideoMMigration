import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [verifyfile, setVerifyFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleVerifyFileChange = (e) => {
    setVerifyFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data);
    } catch (error) {
      setMessage(error.response?.data || 'Upload failed');
    }
  };

  const handleVerify = async () => {
    const formData = new FormData();
    formData.append('file', verifyfile);
    try {
      const res = await axios.post('http://localhost:5000/verify',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data);
    } catch (error) {
      alert('Verification failed!');
    }
  };

  return (
    <div style={{ backgroundImage: "url('sky.png')", minHeight: '100vh', padding: '20px' }}>
      <div className="shadow">
        <img src="./ioit.png" alt="Avatar" className="image" />
        <h1 className="tip" style={{ textAlign: "center", fontSize: "50px", color: "black", fontFamily: "Times New Roman" }}>
          AISSMS's INSTITUTE OF INFORMATION TECHNOLOGY
        </h1>
      </div>
      <br />
      <div style={{display:"flex"}}>
      <div className="cont" style={{ textAlign: "center" }}>
        <label htmlFor="file">
          <h3 style={{ fontSize: "30px", color: "#AACCFF", fontFamily: "Times New Roman" }}>
            Select a Video to upload
          </h3>
          <br />
          <input className="file-upload__label" type="file" name="file" id="file" accept=".mp4,.webm,.ogg" onChange={handleFileChange} />
        </label>
        <br /><br />
        <button onClick={handleUpload} className="submit">Upload File</button>
        <br /><br />
        <p>{message}</p>
      </div>
      <div className="cont" style={{ textAlign: "center" }}>
        <label htmlFor="file">
          <h3 style={{ fontSize: "30px", color: "#AACCFF", fontFamily: "Times New Roman" }}>
            Select a Video to verify
          </h3>
          <br />
          <input className="file-upload__label" type="file" name="file" id="file" accept=".mp4,.webm,.ogg" onChange={handleVerifyFileChange} />
        </label>
        <br /><br />
        <button onClick={handleVerify} className="submit">Verify Video</button>
        <br /><br />
      </div>
      </div>
    </div>
  );
}

export default App;
