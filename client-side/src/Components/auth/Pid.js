import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

//import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";
import { signinPasscoder } from "../../Slices/auth/signUpSlice";
import SpinnerLoader from "../Loader/SpinnerLoader";

const PIDSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //const auth = useSelector((state) => state.auth);

  const [passcoderID, setPasscoderID] = useState("");

  const handleChange = (event) => {
    // Update the state with the input value
    setPasscoderID(event.target.value);
  };

  console.log(passcoderID, "passcoderID");
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await dispatch(
        signinPasscoder({ pid: passcoderID, country: "Nigeria" })
      );
      setLoading(false);
      console.log(response);
      console.log(response.meta.requestStatus);

      if (response.meta.requestStatus === "fulfilled") {
        navigate("/");
      } else {
        setError(response.payload.data.err_code);
      }
    } catch (error) {
      setLoading(false);
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
        paddingTop: "16em",
        paddingBottom: "12em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          Sign In with Passcoder
        </h2>
        <p style={{ marginTop: "0.5em", textAlign: "center" }}>
          Do not have an account?{" "}
          <span
            style={{ color: "#386AEB", cursor: "pointer" }}
            onClick={() => navigate("/pidsignup")}
          >
            Sign up with Passcoder
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
          <br />{" "}
          {error ? (
            <p
              style={{
                backgroundColor: "#FF000029",
                color: "#FF0000",
                height: "2.4em",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1em",
                width: "100%",
                borderLeft: "0.3em red solid",
                marginBottom: "0.9em",
              }}
            >
              {error}
            </p>
          ) : null}
          <br />
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
              onChange={handleChange}
              value={passcoderID}
            />
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
            {loading ? <SpinnerLoader className="spinner" /> : "Submit"}
          </button>
        </div>
      </form>
      <br />
      <br /> <br />
    </div>
  );
};

export default PIDSignIn;
