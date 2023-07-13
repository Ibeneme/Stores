import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../Slices/Users/ProfileSlice";
import "./../profile.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeliveryDining, MdMail, MdVerified, MdHelp } from "react-icons/md";
import { RiBankFill, RiLockPasswordFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FcFaq } from "react-icons/fc";
import { useNavigate } from "react-router";
import { updateProfileAddress } from "../../../Slices/Users/update/NameSlice.js";
import Loader from "../../Loader/Loader";

const UserProfileEditDelivery = () => {
  const dispatch = useDispatch();
  const { loading, profile } = useSelector((state) => state.profile);
  const { error: nameError } = useSelector((state) => state.profileName) || {};

  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

 
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formatAddress = (str) => {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
  
    const addressData = {
      address: formatAddress(address),
      street: formatAddress(street),
      city: formatAddress(city),
      state: formatAddress(state),
    };
  
    try {
      await dispatch(updateProfileAddress(addressData));
  
      if (nameError) {
        console.error("Error updating address:", nameError);
      } else {
        console.log("Address updated successfully!");
        navigate('/deliverydetails');
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };
  

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  const nameErrors = nameError && nameError.data ? nameError.data : [];
  console.log(nameErrors, "here");

  const addressError = nameErrors.find((error) => error.param === "address");
  console.log(addressError);

  const streetError = nameErrors.find((error) => error.param === "street");
  console.log(streetError);

  const cityError = nameErrors.find((error) => error.param === "city");
  console.log(cityError);

  const stateError = nameErrors.find((error) => error.param === "state");
  console.log(stateError);

  return (
    <div>
      {profile && (
        <div>
          <div
            style={{
              display: "flex",
            }}
            className="first-profile-p"
          >
            <div
              style={{
                backgroundColor: "white",
              }}
              className="mobile-hide-profile"
            >
              <p className="p-profile" onClick={() => navigate("/profile")}>
                <FaUserEdit
                  style={{
                    fontSize: "24px",
                  }}
                />
                Personal Details
              </p>
              <p className="p-profile p-active-profile">
                <MdDeliveryDining
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                  onClick={() => navigate("/deliverydetails")}
                />
                Delivery Details
              </p>
              <p className="p-profile">
                <RiBankFill
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                  onClick={() => navigate("/bankdetails")}
                />
                Bank Details
              </p>
              <p className="p-profile">
                <RiLockPasswordFill
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                />
                Change Password
              </p>
              <p className="p-profile">
                <BsFillTelephoneFill
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                />
                Change Phone Number
              </p>
              <p className="p-profile">
                <MdMail
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                />
                Change Email Address
              </p>
              <p className="p-profile">
                <MdVerified
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                  onClick={() => navigate("/kyc")}
                />
                Verify Account
              </p>
              <p className="p-profile">
                <MdHelp
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                />
                Help Desk
              </p>
              <p className="p-profile">
                <FcFaq
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                />
                FAQ
              </p>
            </div>
            <div className="profile-div-right">
              <div className="profile-menu-container">
                <p
                  className="p-profile-overflow"
                  onClick={() => navigate("/profile")}
                >
                  Personal Details
                </p>
                <p
                  className="p-profile-overflow"
                  onClick={() => navigate("/deliverydetails")}
                >
                  Delivery Details
                </p>
                <p
                  className="p-profile-overflow"
                  onClick={() => navigate("/bankdetails")}
                >
                  Bank Details
                </p>
                <p className="p-profile-overflow">Change Password</p>
                <p className="p-profile-overflow">Change Phone Number</p>
                <p className="p-profile-overflow">Change Email Address</p>
                <p
                  className="p-profile-overflow"
                  onClick={() => navigate("/kyc")}
                >
                  Verify Account
                </p>
                <p className="p-profile-overflow">Help Desk</p>
                <p className="p-profile-overflow">FAQ</p>
              </div>
              <h4
                style={{
                  marginBottom: "3em",
                }}
                className="h4-details"
              >
                Delivery Details
              </h4>
              <div className="div-p-profile">
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>Address:</strong>
                    <input
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "#000",
                        height: "50px",
                      }}
                      className="div-lines-display"
                      type="text"
                      placeholder="Enter an address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <p className="error">{addressError?.msg}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>Street:</strong>
                    <input
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "#000",
                        height: "50px",
                      }}
                      className="div-lines-display"
                      type="text"
                      placeholder="Enter a Street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                    <p className="error">{streetError?.msg}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>City:</strong>
                    <input
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "#000",
                        height: "50px",
                      }}
                      className="div-lines-display"
                      type="text"
                      placeholder="Enter a City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <p className="error">{cityError?.msg}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>State:</strong>
                    <input
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "#000",
                        height: "50px",
                      }}
                      className="div-lines-display"
                      type="text"
                      placeholder="Enter a State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <p className="error">{stateError?.msg}</p>
                  </div>

                  <button
                    style={{
                      height: "50px",
                      padding: "12px 16px",
                      backgroundColor: "#000",
                      border: "none",
                      color: "white",
                      borderRadius: "4px",
                      marginBottom: "5em",
                    }}
                    type="submit"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileEditDelivery;
