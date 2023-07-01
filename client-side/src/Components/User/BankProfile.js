// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { userProfile } from "../../Slices/authSlice";
// import './Profile.css'
// import { logoutUser } from "../../Slices/authSlice";
// import { FaPenAlt, FaRegListAlt, FaRegUser } from "react-icons/fa";
// import { MdOutlineHelpOutline, MdLocationOn, MdLogout } from "react-icons/md";
// import {  AiFillBank } from "react-icons/ai";
// import Navbar from "../Navbar-and-Footer/Navbar";
// import Footer from "../Navbar-and-Footer/Footer";
// import { useNavigate } from "react-router";
// import Slider from "./Slider";

// const BankProfile = () => {
//   const dispatch = useDispatch();
//  const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const auth = useSelector((state) => state.auth);
//   const profile = useSelector((state) => state.userProfile);
//   const [accountNumber, setAccountNumber] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [bank, setBank] = useState("");
// const navigate = useNavigate()
// const userData = JSON.parse(localStorage.getItem('userData'))


//   const handleLogout = () => {
//     dispatch(logoutUser(null));
//     window.location.reload();
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


//   return (
//     <div style={{
//       height: "fit-content",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       paddingBottom:'10em',

//     }}>
// <Navbar />
// <Slider />
//       <div className="first-div-profile">
        
//       <div className="second-div-content">
//             <p  onClick={()=>navigate('/profile')} > <FaRegUser />My Account</p>
//             <p className="para-para"> <AiFillBank/>  Bank Details</p>
//             <p onClick={()=>navigate('/deliveryprofile')}> <MdLocationOn /> Delivery Details</p>
//             <p onClick={()=>navigate('/orders')}> <FaRegListAlt />Orders</p>
//             <p onClick={()=>navigate('/help')}><MdOutlineHelpOutline />Help</p>
//             <p onClick={handleLogout}
           
//           >  <MdLogout />Log Out</p>
//           </div>
//       <div className="second-div-profile" >
     
//       <div>
//       <br />
//         <h3>Bank Details <FaPenAlt /></h3>
//         <br />
//       <div style={{
//        marginBottom:'1.52em'
//       }}>
//         <h4>Account Name:</h4>
//          <p>{userData.account_name}</p>
//       </div>
//       <div style={{
//        marginBottom:'1.52em'
//       }}>
//         <h4>Account Number:</h4>
//          <p>{userData.account_number}</p>
//       </div>
//       <div style={{
//        marginBottom:'1.52em'
//       }}>
//         <h4>Bank:</h4>
//          <p>{userData.bank}</p>
//       </div>
//       <button className="bio-button"
//       onClick={()=>navigate('/editbank')}>Edit Bank Details</button>
       
//       </div>
//       </div>
//       </div>


      
     
//   <Footer />
//     </div>
//   );
// };

// export default BankProfile;
