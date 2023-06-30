// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { userProfile } from "../../Slices/authSlice";
// import './Profile.css'
// import { logoutUser } from "../../Slices/authSlice";
// import { FaPiggyBank, FaRegListAlt, FaRegUser } from "react-icons/fa";
// import { MdOutlineHelpOutline, MdLocationOn, MdLogout } from "react-icons/md";
// import {  AiFillBank } from "react-icons/ai";
// import Navbar from "../Navbar-and-Footer/Navbar";
// import Footer from "../Navbar-and-Footer/Footer";
// import { useNavigate } from "react-router";

// const EditBank = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
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

// const userData = JSON.parse(localStorage.getItem('userData'))


//   const handleLogout = () => {
//     dispatch(logoutUser(null));
//     window.location.reload();
//   };

//   const handleAccountNumberChange = (e) => {
//     setAccountNumber(e.target.value);
//   };

//   const handleAccountNameChange = (e) => {
//     setAccountName(e.target.value);
//   };

//   const handleBankChange = (e) => {
//     setBank(e.target.value);
//   };

//   const handleSubmitBank = (e) => {
//     e.preventDefault();
//     const token = auth.token;
//     const endpoint =
//       "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/bank/account";

//     axios
//       .put(
//         endpoint,
//         {
//           account_number: accountNumber,
//           account_name: accountName,
//           bank: bank,
//         },
//         {
//           headers: {
//             "hydra-express-access-token": token,
//           },
//         }
//       )
//       .then((response) => {
//         setSuccessMessage(response.data.message);
//         setErrorMessage("");
//         setAccountNumber("");
//         setAccountName("");
//         setBank("");
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
//             "An error occurred while updating the bank account information."
//           );
//           console.log(error);
//         }
//       });
//   };


//   const BackToHome = () => {
//     navigate("/bankprofile");
//   };


//   return (
//     <div style={{
//       height: "fit-content",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       paddingBottom:'10em',
//       paddingTop:'10em',

//     }}>
// <Navbar />

// <div className="edit-space">
//         <form
//           className="form-profile"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//           }}
//           onSubmit={handleSubmitBank}
//         >

//         <h3 className="H3-profile">Update Bank Account</h3>
       
//        <div 
//          style={{
//            display: "flex",
//            flexDirection: "column",
//          }}
//        >
//          <label>Account Number:</label>
//          <input
//            type="text"
//            placeholder={userData.account_number}
//            className="input-profile"
//            value={accountNumber}
//            onChange={(e) => setAccountNumber(e.target.value)}
//          />
//        </div>
//        <div
//          style={{
//            display: "flex",
//            flexDirection: "column",
//          }}
//        >
//          <label>Account Name:</label>
//          <input
//            type="text"
//            className="input-profile"
//            value={accountName}
//            placeholder={userData.account_name}
//            onChange={(e) => setAccountName(e.target.value)}
//          />
//        </div>
//        <div
//          style={{
//            display: "flex",
//            flexDirection: "column",
//          }}
//        >
//          <label>Bank:</label>
//          <input
//            type="text"
//            className="input-profile"
//            value={bank}
//            placeholder={userData.bank}
//            onChange={(e) => setBank(e.target.value)}
//          />
//        </div>
      
       
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


      
//       {/* <div>
//         <h2>Update Profile Photo</h2>
//         <form onSubmit={handleSubmitPhoto}>
//           <div>
//             <label htmlFor="photo">Photo:</label>
//             <input
//               type="file"
//               id="photo"
//               value={photo}
//               onChange={handlePhotoChange}
//               required
//             />
//           </div>
//           <button type="submit">Update</button>
//         </form>
//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       // </div> 

//       <h2>Update Name</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={handleFirstNameChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="middleName">Middle Name:</label>
//           <input
//             type="text"
//             id="middleName"
//             value={middleName}
//             onChange={handleMiddleNameChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={handleLastNameChange}
//             required
//           />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <div>
//         <h2>Toggle Two-Factor Authentication</h2>
//         <button onClick={handleToggle}>
//           {isTwoFactorAuthEnabled ? "Disable" : "Enable"}
//         </button>
//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </div>

//       <div>
//         <h2>Update Bank Account Information</h2>
//         <form onSubmit={handleSubmitBank}>
//           <div>
//             <label htmlFor="accountNumber">Account Number:</label>
//             <input
//               type="text"
//               id="accountNumber"
//               value={accountNumber}
//               onChange={handleAccountNumberChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="accountName">Account Name:</label>
//             <input
//               type="text"
//               id="accountName"
//               value={accountName}
//               onChange={handleAccountNameChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="bank">Bank:</label>
//             <input
//               type="text"
//               id="bank"
//               value={bank}
//               onChange={handleBankChange}
//               required
//             />
//           </div>
//           <button type="submit">Update</button>
//         </form>
//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </div>

//       <div>
//         <h2>Update Address Information</h2>
//         <form onSubmit={handleSubmitInformation}>
//           <div>
//             <label htmlFor="address">Address:</label>
//             <input
//               type="text"
//               id="address"
//               value={address}
//               onChange={handleAddressChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="street">Street:</label>
//             <input
//               type="text"
//               id="street"
//               value={street}
//               onChange={handleStreetChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="city">City:</label>
//             <input
//               type="text"
//               id="city"
//               value={city}
//               onChange={handleCityChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="state">State:</label>
//             <input
//               type="text"
//               id="state"
//               value={state}
//               onChange={handleStateChange}
//               required
//             />
//           </div>
//           <button type="submit">Update</button>
//         </form>
//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//   </div> */}
//   <Footer />
//     </div>
//   );
// };

// export default EditBank;
