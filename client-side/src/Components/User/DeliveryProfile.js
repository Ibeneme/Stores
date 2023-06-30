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

// const DeliveryProfile = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const auth = useSelector((state) => state.auth);
//  const [bank, setBank] = useState("");
//   const [address, setAddress] = useState("");
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [photo, setPhoto] = useState("");

// const userData = JSON.parse(localStorage.getItem('userData'))

// const handleLogout = () => {
//     dispatch(logoutUser(null));
//     window.location.reload();
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
//             <p  onClick={()=>navigate('/profile')}> <FaRegUser />My Account</p>
//             <p onClick={()=>navigate('/bankprofile')}> <AiFillBank/>  Bank Details</p>
//             <p className="para-para"> <MdLocationOn /> Delivery Details</p>
//             <p onClick={()=>navigate('/orders')}> <FaRegListAlt />Orders</p>
//             <p onClick={()=>navigate('/help')}><MdOutlineHelpOutline />Help</p>
//             <p onClick={handleLogout}
           
//           >  <MdLogout />Log Out</p>
//           </div>
//       <div className="second-div-profile" >
     
//       <div>
//       <br />
//         <h3>Delivery Details <FaPenAlt /></h3>
//         <br />
//       <div style={{
//        marginBottom:'1.52em'
//       }}>
//         <h4>Address:</h4>
//          <p>{userData.address}</p>
//       </div>
//       <div style={{
//        marginBottom:'1.52em'
//       }}>
//         <h4>Street name:</h4>
//          <p>{userData.street}</p>
//       </div>
//       <div style={{
//        marginBottom:'1.52em'
//       }}>
//         <h4>City of Residence:</h4>
//          <p>{userData.city}</p>
//       </div>
//       <div style={{
//        marginBottom:'1.52em'
//       }}>
//         <h4>State of Residence</h4>
//          <p>{userData.state}</p>
//       </div>
//       <button 
//       onClick={()=>navigate('/editaddress')}className="bio-button">Edit Address</button>
       
//       </div>
//       </div>
//       </div>


//   <Footer />
//     </div>
//   );
// };

// export default DeliveryProfile;
