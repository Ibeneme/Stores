import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser, signInWithGoogle  } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    country: "",
    confirmPassword: "",
  });
 
  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user)).then((response) => {
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
    }}>

   
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
        Sign Up with HydraXpress
      </h2>
      <p style={{ marginTop: "0.5em" }}>
      Already have an account?{" "}
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
            First Name
          </label>
          <input
          autoComplete="on"
            name="firstname"
            placeholder="First name"
            type="text"
            className="input-forms"
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
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
            Last Name
          </label>
          <input
          autoComplete="on"
            name="name"
            placeholder="Last Name"
            type="text"
            className="input-forms"
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
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
            Email
          </label>
          <input
          autoComplete="on"
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
            Gender
          </label>
          <input
          autoComplete="on"
            name="gender"
            placeholder="Gender"
            type="text"
            className="input-forms"
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
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
            Country
          </label>
          <input
          autoComplete="on"
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
            Date of birth
          </label>
          <input
          autoComplete="on"
            name="dob"
            placeholder="Date of Birth"
            type="date"
            className="input-forms"
            onChange={(e) => setUser({ ...user, dob: e.target.value })}
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
          autoComplete="on"
            name="password"
            placeholder="Password"
            type="password"
            className="input-forms"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            Confirm Password
          </label>
          <input
          autoComplete="on"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            className="input-forms"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
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
        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}
      </div>
    </form>
    <br/>
    <p style={{ display: "flex", justifyContent: "center" }}>
                     Or
                  </p>
                  <br/> <br/>
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

export default SignUp;
