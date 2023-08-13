// import React, { useState } from "react";

// const PhotoInput = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleFileInputChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const containerStyle = {
//     textAlign: "center",
//     marginTop: "220px",
//   };

//   const uploadButtonStyle = {
//     background: "#1877F2",
//     color: "white",
//     border: "none",
//     padding: "8px 16px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "16px",
//     fontWeight: "bold",
//   };

//   const fileInputStyle = {

//   };

//   const previewImageStyle = {
//     maxWidth: "100%",
//     height: "auto",
//     marginTop: "16px",
//   };

//   return (
//     <div style={containerStyle}>
//       <label htmlFor="file-input" style={uploadButtonStyle}>
//         Select Photo
//       </label>
//       <input
//         type="file"
//         id="file-input"
//         accept="image/*"
//         onChange={handleFileInputChange}
//         style={fileInputStyle}
//       />
//       {previewUrl && <img src={previewUrl} alt="Preview" style={previewImageStyle} />}
//     </div>
//   );
// };

// export default PhotoInput;
