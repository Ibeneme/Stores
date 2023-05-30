// import React from "react";
// import { Formik, Form, } from "formik";
// import * as Yup from "yup";
// import { useDispatch,  } from "react-redux";
// import { signinUser } from "../../Slices/authSlice/signinSlice";
// import TextField from "./Input-components/TextField";
// import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
// import { useNavigate } from "react-router";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
 

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Enter a Valid Email")
//       .required("Email is Required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 Characters")
//       .required("Password is required"),
//   });

//   const handleSubmit = (email, password) => {
//     console.log()
//     dispatch(signinUser({ email, password }));
//   };

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "100vw",
//           height: "100vh",
//           backgroundColor: "white",
//         }}
//       >
//         <Formik
//           initialValues={{
//             email: "",
//             password: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {(formik) => (
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <img
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//                 src={logo}
//                 alt="logo"
//               />
//               <h2
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginTop: "0.5em",
//                 }}
//               >
//                 Sign In with HydraXpress
//               </h2>
//               <p style={{ marginTop: "0.5em" }}>
//                 Do not have an account?{" "}
//                 <span
//                   style={{ color: "#386AEB", cursor: "pointer" }}
//                   onClick={() => navigate("/signup")}
//                 >
//                   Sign Up
//                 </span>
//               </p>
//               <br /> <br />
//               <div>
//                 <TextField label="Email Address" name="email" type="email" />
//                 <br />
//                 <TextField label="Password" name="password" type="password" />
//                 <br />

//                 <p
//                   style={{
//                     fontSize: "0.9em",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "flex-end",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => navigate("/forgotPassword")}
//                 >
//                   Forgot Password?
//                 </p>

//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   <br />
//                   <br />
//                   <button
//                     style={{
//                       backgroundColor: "#386AEB",
//                       height: "3.1em",
//                       border: "0.7em",
//                       color: "white",
//                       fontSize: "1em",
//                     }}
//                     onClick={handleSubmit}
//                   >
//                     Next
//                   </button>
//                   <br />
//                   <br />
//                   <p style={{ display: "flex", justifyContent: "center" }}>
//                     Or
//                   </p>
//                   <br />
//                   <br />
//                   <button
//                     style={{
//                       fontSize: "1em",
//                       backgroundColor: "black",
//                       height: "3.1em",
//                       border: "0.7em",
//                       color: "white",
//                       borderRadius: "0.3em",
//                     }}
//                     type="submit"
//                   >
//                     Sign in with Passcoder
//                   </button>
//                   <button
//                     style={{
//                       fontSize: "1em",
//                       backgroundColor: "#66666635",
//                       height: "3.1em",
//                       border: "0.7em",
//                       color: "black",
//                       marginTop: "0.8em",
//                     }}
                    
//                   >
//                     Sign in with Google
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);


  const [user, setUser] = useState({
    country: "",
    pid: "",
  });
 
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user)).then((response) => {
      if (response.payload.success) {
        navigate(`/`);
      } else {
        console.log("nooooo");
      }
    });
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
      paddingTop: "8em",
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
        Sign In with Passcoder
      </h2>
      <p style={{ marginTop: "0.5em" }}>
        Do not have an account?{" "}
        <span
          style={{ color: "#386AEB", cursor: "pointer" }}
          onClick={() => navigate("/pid-signup")}
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
    <br /> <br />

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

export default SignIn;
