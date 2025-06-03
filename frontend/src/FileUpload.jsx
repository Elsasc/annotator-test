import React, { useState } from 'react';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      // Update this URL after deploying your backend!
      const response = await fetch('https://annotator-test-cxr9.onrender.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
      } else {
        console.error('Upload error:', response.statusText);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Upload PDF for Modification</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <br /><br />
        <button type="submit">Upload & Process</button>
      </form>
      {downloadUrl && (
        <div>
          <h3>Your modified file is ready</h3>
          <a href={downloadUrl} download="modified.pdf">
            Download Modified PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
