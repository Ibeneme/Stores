
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";

const PIDSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);


  const [user, setUser] = useState({
    country: "",
    pid: "",
  });
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch((user));
      if (response.meta.requestStatus === "fulfilled"){
        navigate(`/pidsignin`);
      } else {
        console.log("Registration failed");
        console.log(response)
        setError("Please Re-Confirm your details");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
      paddingTop: "19em",
      paddingBottom: "12em",
      justifyContent: "center",
      alignItems: "center",
    }}>

   
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "white",
        height: "100vh",
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
       Create an account with Passcoder
      </h2>
      <p style={{ marginTop: "0.5em" }}>
       Already have an account?{" "}
        <span
          style={{ color: "#386AEB", cursor: "pointer" }}
          onClick={() => navigate("/pidsignin")}
        >
          Sign In with Passcoder
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
    <br />   {error ? (
              <p
                style={{
                  backgroundColor: "#FF000029",
                  color: "#FF0000",
                  height: "2.4em",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "1em",
                  width:'100%',
                  borderLeft: "0.3em red solid",
                  marginBottom: "0.9em",
                }}
              >
                {error}
              </p>
            ) : null}<br />

        <div>
          {" "}
          <label
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {" "}
            Country
          </label>
          <input
            name="country"
            placeholder="Country"
            type="text"
            className="input-forms"
            onChange={(e) => setUser({ ...user, country: e.target.value })}
          />
        </div>

    

        <div>
          {" "}
          <label
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {" "}
            Passcoder ID
          </label>
          <input
            name="pid"
            placeholder="Enter Passcoder ID"
            type="text"
            className="input-forms"
            onChange={(e) => setUser({ ...user, pid: e.target.value })}
          />
        </div>
   

    <button 
        style={{
          backgroundColor:'#386aeb',
          color:'white',
          border:'none',
          borderRadius:'0.5em',
          marginTop:'2em'
        }}
        className="input-forms">
          {auth.registerStatus === "pending" ? "Loading...." : "Submit"}
        </button>
      </div>
    </form>
    <br/>
  
                  <br/> <br/>
     
                     </div>
     
  );
};

export default PIDSignUp;
