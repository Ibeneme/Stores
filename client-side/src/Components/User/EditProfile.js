// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { userProfile } from "../../Slices/authSlice";
// import Navbar from "../Navbar-and-Footer/Navbar";
// import Footer from "../Navbar-and-Footer/Footer";

// const UpdateNameFormEdit = () => {
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const auth = useSelector((state) => state.auth);
//   const profile = useSelector((state) => state.userProfile);
//   const [isTwoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
//   const [accountNumber, setAccountNumber] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [bank, setBank] = useState("");
//   const [address, setAddress] = useState("");
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [photo, setPhoto] = useState("");
//   const navigate = useNavigate();
//   const userData = JSON.parse(localStorage.getItem('userData'))
//   const handleFirstNameChange = (e) => {
//     setFirstName(e.target.value);
//   };

//   const handleMiddleNameChange = (e) => {
//     setMiddleName(e.target.value);
//   };

//   const handleLastNameChange = (e) => {
//     setLastName(e.target.value);
//   };

//   const handleToggle = () => {
//     const token = auth.token;
//     const endpoint =
//       "https://us-central1-hydra-express.cloudfunctions.net/app/user/2fa/toggle";

//     axios
//       .put(
//         endpoint,
//         { two_factor_authentication: !isTwoFactorAuthEnabled },
//         {
//           headers: {
//             "hydra-express-access-token": token,
//           },
//         }
//       )
//       .then((response) => {
//         setTwoFactorAuthEnabled(!isTwoFactorAuthEnabled);
//         setSuccessMessage(response.data.message);

//         setErrorMessage("");
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
//           setErrorMessage(
//             "An error occurred while toggling two-factor authentication."
//           );
//           console.log(error);
//         }
//       });
//   };
//   const BackToHome = () => {
//     navigate("/profile");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = auth.token;
//     const nameData = {
//       firstname: firstName,
//       middlename: middleName,
//       lastname: lastName,
//     };

//     const bankData = {
//       account_number: accountNumber,
//       account_name: accountName,
//       bank: bank,
//     };

//     const addressData = {
//       address: address,
//       street: street,
//       city: city,
//       state: state,
//     };

//     const photoData = {
//       photo: photo,
//     };

//     const requests = [];

//     if (nameData.firstname || nameData.lastname) {
//       const nameRequest = axios.put(
//         "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/name",
//         nameData,
//         {
//           headers: {
//             "hydra-express-access-token": token,
//           },
//         }
//       );
//       requests.push(nameRequest);
//     }

//     if (bankData.account_number || bankData.account_name || bankData.bank) {
//       const bankRequest = axios.put(
//         "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/bank/account",
//         bankData,
//         {
//           headers: {
//             "hydra-express-access-token": token,
//           },
//         }
//       );
//       requests.push(bankRequest);
//     }

//     if (
//       addressData.address ||
//       addressData.street ||
//       addressData.city ||
//       addressData.state
//     ) {
//       const addressRequest = axios.put(
//         "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/address",
//         addressData,
//         {
//           headers: {
//             "hydra-express-access-token": token,
//           },
//         }
//       );
//       requests.push(addressRequest);
//     }

//     if (photoData.photo) {
//       const photoRequest = axios.put(
//         "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/photo",
//         photoData,
//         {
//           headers: {
//             "hydra-express-access-token": token,
//           },
//         }
//       );
//       requests.push(photoRequest);
//     }
  

//     try {
//       const responses = await axios.all(requests);
//       setSuccessMessage("Profile updated successfully.");
//       setErrorMessage("");
//       console.log(responses);
//     } catch (error) {
//       setSuccessMessage("");
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         setErrorMessage(error.response.data.message);
//         console.log(error);
//       } else {
//         setErrorMessage("An error occurred while updating the profile.");
//         console.log(error);
//       }
//     }
//   };
//   return (
// <div>
//   <Navbar />
// <div
//       style={{
//         height: "fit-content",
//         backgroundColor: "white",
//         padding: "1em",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         paddingBottom:'10em',
//         paddingTop:'10em',
//       }}
//       className="div-container-profile"
//     >
//       <form
//         className="form-profile"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//         }}
//         onSubmit={handleSubmit}
//       >
//         <br />
//    <h1> Edit Profile</h1>

//         <br />
//         <h3 className="H3-profile">Update Name</h3>
//         <div>
         
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <label>First Name:</label>
//             <input
//               type="text"
//               className="input-profile"
         
//               value={firstName}
//               placeholder={userData.firstname}
//               onChange={handleFirstNameChange}
//             />
//           </div>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>Middle Name:</label>
//           <input
//             className="input-profile"
//             type="text"
//             value={middleName}
//             placeholder={userData.middlename}
//             onChange={handleMiddleNameChange}
//           />
//         </div>

//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>Last Name:</label>
//           <input
//             type="text"
//             className="input-profile"
//             value={lastName}
//             placeholder={userData.lastname}
//             onChange={handleLastNameChange}
//           />
          
//         </div>

//         {/* <h3
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           Toggle Two-Factor Authentication
//         </h3>
//         <div>
//           <label>Enabled:</label>
//           <input
//             type="checkbox"
//             checked={isTwoFactorAuthEnabled}
//             onChange={handleToggle}
//           />
//         </div> */}

//         <h3 className="H3-profile">Update Bank Account</h3>
       
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>Account Number:</label>
//           <input
//             type="text"
//             placeholder={userData.account_number}
//             className="input-profile"
//             value={accountNumber}
//             onChange={(e) => setAccountNumber(e.target.value)}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>Account Name:</label>
//           <input
//             type="text"
//             className="input-profile"
//             value={accountName}
//             placeholder={userData.account_name}
//             onChange={(e) => setAccountName(e.target.value)}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>Bank:</label>
//           <input
//             type="text"
//             className="input-profile"
//             value={bank}
//             placeholder={userData.bank}
//             onChange={(e) => setBank(e.target.value)}
//           />
//         </div>

//         <h3 className="H3-profile">Update Address</h3>
       
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>Address:</label>
//           <input
//             type="text"
//             className="input-profile"
//             value={address}
//             placeholder={userData.address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>Street:</label>
//           <input
//             type="text"
//             className="input-profile"
//             value={street}
//             placeholder={userData.street}
//             onChange={(e) => setStreet(e.target.value)}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>City:</label>
//           <input
//             type="text"
//             className="input-profile"
//             value={city}
//             placeholder={userData.city}
//             onChange={(e) => setCity(e.target.value)}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>State:</label>
//           <input
//             type="text"
//             className="input-profile"
//             value={state}
//             placeholder={userData.state}
//             onChange={(e) => setState(e.target.value)}
//           />
//         </div>

//         {/* <h3>Upload Photo</h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <label>Photo:</label>
//           <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
//         </div> */}
// <br />
// <br />

//         <button 
//         className="button-profile"
//         type="submit">Update Profile</button>
//       </form>{" "}
//    <div className="form-profile">
//   <button   className="back-profile"
//       onClick={BackToHome}>BackToHome</button>

// </div> 
//       {successMessage && <p>{successMessage}</p>}
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>

// <div style={{
//   marginTop:'-4em'
// }}>
// <Footer />
// </div>
// </div>
//   );
// };

// export default UpdateNameFormEdit;
