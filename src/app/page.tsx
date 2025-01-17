"use client"; // This is a client component 
import { useState } from "react";
export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    console.log('File to upload:', selectedFile);
  };
  return (
    <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-center">Upload your file</h2>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileInput">
        Choose a file
      </label>
      <input
        id="fileInput"
        type="file"
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleFileChange}
      />
    </div>
    {selectedFile && (
      <div className="text-sm text-gray-500 mb-4">
        Selected file: {selectedFile.name}
      </div>
    )}
    <button
      type="button"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleUpload}
    >
      Upload
    </button>
  </div>
  )
}
