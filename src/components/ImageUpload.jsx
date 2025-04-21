import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ setOcrData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid image (JPEG or PNG).');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/ocr', formData);
      setOcrData(response.data);
    } catch (err) {
      setError('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImageUpload;
