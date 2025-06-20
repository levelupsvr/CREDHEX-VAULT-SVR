// File: UploadForm.js
import React, { useRef, useState } from "react";
import { supabase } from "../supabase"; // adjust path as needed

const DropZone = ({ onFileDrop }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileDrop(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileDrop(e.target.files[0]);
    }
  };

  return (
    <div
      className={`drop-zone${dragActive ? " drag-active" : ""} w-full items-center justify-center flex flex-col`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="File upload drop zone"
      style={{
        border: "2px dashed #800020",
        padding: "2rem",
        borderRadius: "12px",
        textAlign: "center",
        cursor: "pointer",
        background: dragActive ? "#fef3c7" : "#fffbea",
        transition: "background 0.2s",
      }}
    >
      <div className="drop-icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M36 32a6 6 0 0 0 0-12 7.5 7.5 0 0 0-14.7-2.1A6 6 0 1 0 12 32h24z"
            fill="#80002022"
          />
          <path
            d="M24 20v10m0 0l-5-5m5 5l5-5"
            stroke="#800020"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mt-4 font-sans text-center">
  <span className="block font-semibold text-amber-700 text-lg">
    Drag &amp; drop your file here
  </span>
  <span className="block text-amber-400">or</span>
  <span className="block text-amber-700 font-medium cursor-pointer underline hover:text-amber-800 transition-colors">
    Click to select
  </span>
</div>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
};

const UploadForm = ({ user }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileDrop = async (file) => {
    if (!user?.id) {
      alert("User not authenticated.");
      return;
    }

    setUploading(true);

    const filePath = `${user.id}/${file.name}`;
    const { error } = await supabase.storage
      .from("certificates")
      .upload(filePath, file, { upsert: true });

    if (error) {
      alert("Upload failed: " + error.message);
    } else {
      alert("Upload successful!");
    }

    setUploading(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto p-6 bg-amber-100 rounded-lg shadow-md">
      <DropZone onFileDrop={handleFileDrop} />
      {uploading && (
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#800020" }}>
          Uploading...
        </p>
      )}
    </div>
  );
};

export default UploadForm;
