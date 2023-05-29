// import React from "react";
// import { Formik, Form, } from "formik";
// import * as Yup from "yup";
// import { useDispatch,  } from "react-redux";
// import axios from "axios";
// import { signInUser } from "../../Slices/authSlice/signinSlice";
// import { generateOTP } from "../../Slices/authSlice/createOtp";
// import TextField from "./Input-components/TextField";
// import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
// import { useNavigate } from "react-router";
import React from 'react'

const SignIn = () => {
  return (
    <div>SignIn</div>
  )
}

export default SignIn
// const SignIn = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const { loading, error, success } = useSelector((state) => state.signup);

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Enter a Valid Email")
//       .required("Email is Required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 Characters")
//       .required("Password is required"),
//   });

//   const handleSubmit = async (values) => {
//     try {
//       await axios.post(
//         "https://us-central1-hydra-express.cloudfunctions.net/app/auth/user/signin/via/email",
//         {
//           email: values.email,
//           password: values.password,
//         }
//       );

//       dispatch(signInUser({ email: values.email, password: values.password }));
//       dispatch(generateOTP(values.email));

//       navigate(`/verify?email=${values.email}`); // Navigate to the next page upon successful sign-in
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.statusText); // Status text
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log("Error", error.message);
//       }
//     }
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
//               <Form>
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
//                     type="submit"
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
//                     onClick={handleSubmit}
//                   >
//                     Sign in with Google
//                   </button>
//                 </div>
//               </Form>
//             </div>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
