import React from "react";
import loaderGif from "./gif/Studio_Project_V6.gif";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
        width: "100vw",
      }}
    >
      <div
        style={{
  
        }}
      >
        <img
          src={loaderGif}
          alt="Loading"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            paddingTop: "3em",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
