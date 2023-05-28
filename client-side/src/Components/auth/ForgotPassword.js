// import React from "react";
// import { Formik, Form } from "formik";
// import TextField from "./TextField";
// import * as Yup from "yup";
// import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
// import { useNavigate } from "react-router";


// const ForgotPassword = () => {  
//   const navigate = useNavigate()
    
//   const validate = Yup.object({
//     email: Yup.string()
//     .email("Enter a Valid Email is invalid")
//     .required("Email is Required"),
//     password: Yup.string()
//     .min(6, "Password must be at least 6 Characters")
//     .required("Enter a Valid Password is required"),})

//   return (
//     <div>  <div
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       width: "100vw",
//       height: "100vh",
//       backgroundColor: "white",
//     }}
//   >
//     <Formik
//       initialValues={{
//         email: "",
//         password: "",
    
       
//       }}
//       validationSchema={validate}
//     >
//       {(formik) => (
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             src={logo}
//             alt="logo"
//           />
//           <h2
//             style={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: "0.5em",
//             }}
//           >
//             {" "}
//             Forgot Password
//           </h2>
//           <p  style={{
//             marginTop:"0.5em"
           
//           }}>Please Enter your email to reset Password </p><br /> <br />
       
//           <Form>
//             <TextField label="Email Address" name="email" type="email" />
          
//     <p style={{
//               fontSize:'0.83em',
//               display:'flex',
//               flexDirection:'row',
//               justifyContent:'flex-end'

//             }}
//             onClick={()=>navigate('/signin')}> Did you Remember your Password?
//             <span style={{
//               color:'blue',
//               marginLeft:'0.31em'
//             }}> Sign In
//               </span> </p>
//             <br />
//             {/* <TextField label="Email Address" name="email" type="email" />
//               <TextField label="Date Of Birth" name="DateOfBirth" type="date" />
//               <TextField
//                 label="Create Password"
//                 name="createPassword"
//                 type="password"
//               />
//               <TextField
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type="password"
//               /> */}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <br />
//               <button
//                 style={{
//                   backgroundColor: "#386AEB",
//                   height: "3.1em",
//                   borderRadius: "0.4em",
//                     border:'none',
//                   color: "white",
//                   fontSize:'1em',
              
//                 }}
//                 type="submit"

               
//               >
//                 Next
//               </button>
//               <br /> <br /> <br />
              
//             </div>

//             {/* <button type='submit'>Reset</button> */}
//           </Form>
//         </div>
//       )}
//     </Formik>
//   </div></div>
//   )
// }

// export default ForgotPassword

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordResetEmail } from '../../Slices/authSlice/EmailresetPassword';
import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.forgotPassword);
  const [showLoader, setShowLoader] = useState(false); // State variable to control loader visibility

  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = async () => {
    try {
      setShowLoader(true); // Show loader when password reset is requested
      await dispatch(requestPasswordResetEmail(email));
      console.log('success');
      navigate('/changepassword');
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setShowLoader(false); // Hide loader after password reset request is completed
    }
  };

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false); // Hide loader after 1 minute
    }, 100000);

    return () => {
      clearTimeout(loaderTimeout); // Clear the timeout when the component is unmounted
    };
  }, []);

  return (
    <div>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <h2>Forgot Password</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
          <button onClick={handlePasswordReset} disabled={loading}>
            Reset Password
          </button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {success && <p>Password reset email sent successfully!</p>}
        </>
      )}
    </div>
  );
};

export default ForgotPassword;


