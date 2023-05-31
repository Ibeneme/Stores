
// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../../Slices/authSlice";
//  import { useSelector } from "react-redux";
// import {  useNavigate } from "react-router";
// import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
// import "./auth.css";

// const SignIn = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
// const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get('email');

//   const auth = useSelector((state) => state.auth);


//   const [user, setUser] = useState({
//    otp: "",
//   });

  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(user)).then((response) => {
//       if (response.payload.success) {
//         navigate(`/`);
//       } else {
//         console.log("nooooo");
//       }
//     });
//   };

//   return (
//     <div
//     style={{
//       backgroundColor: "white",
//       height: "100vh",
//       weight: "100vw",
//       display: "flex",
//       flexDirection: "column",
//       paddingLeft: "2em",
//       paddingRight: "2em",
//       paddingTop: "8em",
//       paddingBottom: "12em",
//       justifyContent: "center",
//       alignItems: "center",
//     }}>

   
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         backgroundColor: "white",
//         height: "100vh",
//         weight: "100vw",
//         display: "flex",
//         flexDirection: "column",  
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <img
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "3em",
//         }}
//         src={logo}
//         alt="logo"
//       />
//       <h2
//         style={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: "0.5em",
//         }}
//       >
//         Verify your Account
//       </h2>
//       <p style={{ marginTop: "0.5em" }}>
//         Didn't get an OTP{" "}
//         <span
//           style={{ color: "#386AEB", cursor: "pointer" }}
//           // onClick={() => navigate("/pid-signup")}
//         >
//           Resend OTP
//         </span>
//       </p>
//       <br />{" "}
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//     <br /> <br />

//         <div>
//           {" "}
//           <label
//             style={{
//               display: "flex",
//               justifyContent: "flex-start",
//             }}
//           >
//             {" "}
//             OTP
//           </label>
//           <input
//             name="otp"
//             placeholder="Enter your OTP"
//             type="text"
//             className="input-forms"
//             onChange={(e) => setUser({ ...user, otp: e.target.value })}
//           />
//         </div>

  
   

//     <button 

//         style={{
//           backgroundColor:'#386aeb',
//           color:'white',
//           border:'none',
//           borderRadius:'0.5em',
//           marginTop:'2em'
//         }}
//         className="input-forms">
//           Verify
//         </button>

//       </div>
//     </form>
//     <br/>
  
//                   <br/> <br/>
     
//                      </div>
     
//   );
// };

// export default SignIn;

import React from 'react';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../Slices/verificationSlice';

const VerificationButton = ({ email }) => {
  const dispatch = useDispatch();

  const handleVerification = (email) => {
   
    dispatch(verifyEmail(email));
    
   
  };

  return (
    <button onClick={handleVerification}>Verify Email for {email}</button>
  );
};

export default VerificationButton;
