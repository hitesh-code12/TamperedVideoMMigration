import React, { useState } from 'react';
import axios from 'axios';
import logo from "./ioit.png"
export default function VideoUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please choose a file');
      return;
    }

    const extension = file.name.split('.').pop().toLowerCase();
    if (!['mp4', 'ogg', 'webm'].includes(extension)) {
      setMessage('The file extension must be .mp4, .ogg, or .webm to be uploaded');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/up.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Uploaded!');
      window.location.href = 'uploadVerification.html';
    } catch (error) {
      setMessage('Upload failed');
    }
  };

  return (
    <div style={{ backgroundImage: "url('sky.png')", minHeight: '100vh',width:"100vh", padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Avatar" style={{ width: '200px', height: '200px' }} />
        <h1 style={{ textAlign: 'center', fontSize: '50px', color: 'black', fontFamily: 'Times New Roman' }}>
          AISSMS's INSTITUTE OF INFORMATION TECHNOLOGY
        </h1>
      </div>
      <div style={{ marginTop: '30px', textAlign: 'center', width: '700px', height: '300px', marginLeft: 'auto', marginRight: 'auto', background: 'linear-gradient(to top right, #222233, #3498db)', borderRadius: '5px', border: '1px solid', boxShadow: '5px 10px 18px #888888' }}>
        <form onSubmit={handleSubmit} style={{ paddingTop: '50px' }}>
          <h3 style={{ fontSize: '30px', color: '#AACCFF', fontFamily: 'Times New Roman' }}>Select a Video to upload</h3>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ maxWidth: '250px', color: '#AACCFF', fontFamily: 'Quicksand, sans-serif', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '20px' }}
          />
          <br />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Upload file</button>
        </form>
        {message && <p style={{ color: 'white', marginTop: '20px' }}>{message}</p>}
      </div>
    </div>
  );
}
