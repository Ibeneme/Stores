import React from "react";
import "./ShimmerLoader.css"; // Import the CSS file for styling

const ShimmerLoader = () => {
  return (
    <div className="shimmer-loader-container">
      {/* Create multiple shimmer lines */}
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
    </div>
  );
};

export default ShimmerLoader;
