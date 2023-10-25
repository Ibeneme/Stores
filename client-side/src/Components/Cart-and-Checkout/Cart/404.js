import React from "react";
import { useNavigate } from "react-router";
import logo from "../images/5购物渐变扁平矢量人物插画2420220903果冻_画板 1.png";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 64,
          marginTop: 48,
        }}
      >
        <div className="no-product">
          <h2
            style={{
              marginTop: 12,
              marginBottom: 12,
            }}
          >
            Whoopss.... Page not found
          </h2>

          <p>page not available</p>
          <br />
          <br />
          <img src={logo} alt="logo" />
          <br />
          <button
            style={{
              width: "200px",
              height: "3.8em",
              borderRadius: "0.4em",
              border: "none",
              backgroundColor: "#386AEB",
              color: "white",

              fontSize: "1em",
            }}
            onClick={() => navigate("/")}
          >
            Start shopping
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
