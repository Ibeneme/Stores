
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",

  });



  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        weight: "100vw",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "2em",
        paddingRight: "2em",
        paddingTop: "8em",
        paddingBottom: "12em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
      
        style={{
          backgroundColor: "white",
          height: "",
          weight: "100vw",
          display: "flex",
          flexDirection: "column",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "3em",
          }}
          src={logo}
          alt="logo"
        />
        <h2
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0.5em",
          }}
        >
         Forgot Password
        </h2>
        <p style={{ marginTop: "0.5em" }}>
         Remembered your Password{" "}
          <span
            style={{ color: "#386AEB", cursor: "pointer" }}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
        <br />{" "}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            {" "}
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              Email
            </label>
            <input
              name="email"
              placeholder="Email"
              type="text"
              className="input-forms"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

       
              <div style={{
                  display:'flex',
                  justifyContent:"flex-end",
                  alignItems:"flex-end",
                  width:'100%',
                


                }}>

              </div>
          <button
            style={{
              backgroundColor: "#386aeb",
              color: "white",
              border: "none",
              borderRadius: "0.5em",
              marginTop: "2em",
            }}
            className="input-forms"
          >
            {auth.registerStatus === "pending" ? "Loading...." : "Submit"}
          </button>
        </div>
      </form>
   
    </div>
  );
};

export default ForgotPassword;
