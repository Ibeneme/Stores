// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { userProfile } from "../../Slices/authSlice";
// import "./Profile.css";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar-and-Footer/Navbar";
// import Footer from "../Navbar-and-Footer/Footer";

// const EditName = () => {
//   const dispatch = useDispatch();
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const auth = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const userData = JSON.parse(localStorage.getItem("userData"));

//   const handleFirstNameChange = (e) => {
//     setFirstName(e.target.value);
//   };
//   const BackToHome = () => {
//     navigate("/profile");
//   };

//   const handleMiddleNameChange = (e) => {
//     setMiddleName(e.target.value);
//   };

//   const handleLastNameChange = (e) => {
//     setLastName(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const token = auth.token;
//     const data = {
//       firstname: firstName,
//       middlename: middleName,
//       lastname: lastName,
//     };

//     axios
//       .put(
//         "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/name",
//         data,
//         {
//           headers: {
//             "hydra-express-access-token": token,
//           },
//         }
//       )
//       .then((response) => {
//         setSuccessMessage(response.data.message);
//         setErrorMessage("");
//         setFirstName("");
//         setMiddleName("");
//         setLastName("");
//         console.log(response.data);
//       })
//       .catch((error) => {
//         setSuccessMessage("");
//         if (
//           error.response &&
//           error.response.data &&
//           error.response.data.message
//         ) {
//           setErrorMessage(error.response.data.message);
//           console.log(error);
//         } else {
//           setErrorMessage("An error occurred while updating the name.");
//           console.log(error);
//         }
//       });
//   };

//   return (
//     <div
//       style={{
//         height: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         paddingBottom: "10em",
//         paddingTop: "10em",
//         paddingTop:'10em'
//       }}
//     >
//         <Navbar />
//       <div className="edit-space">
//         <form
//           className="form-profile"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//           onSubmit={handleSubmit}
//         >
//           <h1> Edit Profile</h1>

//           <br />
//           <h3 className="H3-profile">Update Name</h3>
//           <div>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <label>First Name:</label>
//               <input
//                 type="text"
//                 className="input-profile"
//                 value={firstName}
//                 placeholder={userData.firstname}
//                 onChange={handleFirstNameChange}
//               />
//             </div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <label>Middle Name:</label>
//             <input
//               className="input-profile"
//               type="text"
//               value={middleName}
//               placeholder={userData.middlename}
//               onChange={handleMiddleNameChange}
//             />
//           </div>

//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <label>Last Name:</label>
//             <input
//               type="text"
//               className="input-profile"
//               value={lastName}
//               placeholder={userData.lastname}
//               onChange={handleLastNameChange}
//             />
//           </div>
//           <br />
//           <br />

//           <button className="button-profile" type="submit">
//             Update Profile
//           </button>
//         </form>{" "}  <br />
//         <button className="back-profile" onClick={BackToHome}>
//           Back to Profile
//         </button>
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default EditName;
