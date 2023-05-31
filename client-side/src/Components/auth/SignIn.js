
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, signInWithGoogle } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";

 

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user)).then((response) => {
      if (response.payload) {
        navigate(`/verify?email=${user.email}`);

      } else {
        console.log("nooooo");
      }
    });
  };
  const googleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await dispatch(signInWithGoogle(user));
      if (result.type === signInWithGoogle.fulfilled.toString()){
        navigate('/cart'); 
      } else {
        
      }
    } catch (error) {
      console.log(error);
    }
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
            autoComplete="off"
              name="email"
              placeholder="Email"
              type="text"
              className="input-forms"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              Password
            </label>
            <input
            autoComplete="off"
              name="password"
              placeholder="Password"
              type="password"
              className="input-forms"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
              <div style={{
                  display:'flex',
                  justifyContent:"flex-end",
                  alignItems:"flex-end",
                  width:'100%',
                


                }}>

                <p style={{
                  color:'#386aeb',
                  marginTop:'-1em',
                  width:'100%',
                  display:'flex',
                  justifyContent:"flex-end",
                  alignItems:"flex-end",
                

                }} onClick={()=>navigate('/forgotPassword')}>Forgot Password?</p>
             
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
            {auth.loginStatus === "pending" ? "Loading...." : "Submit"}
          </button>
        </div>
      </form>
      <br />
      <p style={{ display: "flex", justifyContent: "center" }}>Or</p>
      <br /> <br />
      <button
        style={{
          backgroundColor: "black",

          border: "0.7em",
          color: "white",
          borderRadius: "0.3em",
        }}
        className="input-forms"
      >
        Sign in with Passcoder
      </button>
      <button
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
      </button>
    </div>
  );
};

export default SignIn;
