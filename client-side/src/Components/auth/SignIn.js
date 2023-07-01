import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signInWithGoogle } from "../../Slices/authSlice";
import { userProfile } from "../../Slices/userSlice";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false); 
  const location = useLocation()

  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.userProfile
  );
  const token = auth.token;
 
  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lowercaseEmail = user.email.toLowerCase(); // Convert email to lowercase
      const response = await dispatch(loginUser({ ...user, email: lowercaseEmail }));
      console.log(response);
      console.log(response.meta.requestStatus);

      if (response.meta.requestStatus === "fulfilled") {
        setSubmitted(true);  
        dispatch(userProfile(token));
        const previousPath = location.state?.from || "/"; // Get the previous path from location state

        navigate(previousPath);  
      } else {
        console.log(user);
        setError("Invalid Email or Password");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

// const googleSubmit = async (e) => {
//    e.preventDefault();

//   try {
//     const result = await dispatch(signInWithGoogle(user));
//      if (result.type === signInWithGoogle.fulfilled.toString()) {
      
//        navigate("/");
//     } else {
//     }
//     } catch (error) {
//     console.log(error);
//    }
//  };

 

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "",
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

      
      <div>


      <form
        onSubmit={handleSubmit}
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
          Sign In with HydraXpress
        </h2>
        <p style={{ marginTop: "0.5em" }}>
          Do not have an account?{" "}
          <span
            style={{ color: "#386AEB", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <br />
            {error ? (
              <p
                style={{
                  backgroundColor: "#FF000029",
                  color: "#FF0000",
                  height: "2.4em",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "1em",
                  borderLeft: "0.3em red solid",
                  marginBottom: "0.9em",
                }}
              >
                {error}
              </p>
            ) : null}
            <br />
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              Email
            </label>
            <input

              autoComplete="off"
              name="email"
              placeholder="Email"
              type="email"
              required
              className="input-forms"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          
          </div>

          <div>
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                onFocus={handleFocusPassword}
                onBlur={handleBlurPassword}
                autoComplete="off"
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="input-forms"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              {isFocusedPassword ? <p style={{
              marginTop:'-1.5em',
              marginBottom:'1.3em',
              fontSize:'0.8em',
              color:'#386AEB'

            }}>An Uppercase, Lowercase, Numbers & specials</p> : null}  <span
                style={{
                  marginTop: "-0.75em",
                  fontSize: "0.8em",
                  position: "absolute",
                  right: "1em",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={handleTogglePassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
              marginTop: "-1em",
            }}
          >
            <p
              style={{
                color: "#386aeb",
                marginTop:'1em',
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                cursor: "pointer",
              }}
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password?
            </p>
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
            Submit
          </button>
        </div>
      </form>
      <br />
      <p style={{ display: "flex", justifyContent: "center" }}>Or</p>
      <br /> <br />

      <div style={{
        display:'flex',
        flexDirection:'column'
      }}>


      <button
        style={{
          backgroundColor: "black",
          border: "0.7em",
          color: "white",
          borderRadius: "0.3em",
        }}
        className="input-forms"
        onClick={() => {
          navigate("/pidsignin");
        }}
      >
        Sign in with Passcoder
      </button>
    {/* <button
        style={{
          backgroundColor: "#66666635",
          border: "0.7em",
          color: "black",
          marginTop: "0.8em",
        }}
        className="input-forms"
        onClick={googleSubmit}
      >
        Sign in with Google
      </button>  */}
          </div>

        </div>
    </div>
  );
};

export default SignIn;
