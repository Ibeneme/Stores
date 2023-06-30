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
          marginTop: "-12em",
        }}
      >
        <img
          src={loaderGif}
          alt="Loading"
          style={{
            width: "350px",
            height: "350px",
            objectFit: "cover",
            paddingTop: "12em",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
