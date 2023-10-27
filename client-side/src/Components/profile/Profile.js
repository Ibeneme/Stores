// App.js (or any other component where you want to access the Redux store)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Slices/Users/ProfileSlice";
// import { useNavigate } from "react-router";
import "./profile.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeliveryDining, MdMail, MdVerified, MdHelp } from "react-icons/md";
import { RiBankFill, RiLockPasswordFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FcFaq } from "react-icons/fc";
import { useNavigate } from "react-router";
import { RiFileCopy2Line } from "react-icons/ri";
import Loader from "../Loader/Loader";

// ...
const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, profile, error } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  }
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {profile && (
        <div>
          <div
            style={{
              backgroundColor: "#064BDE",
              height: 300,
            }}
          ></div>
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
              <p
                className="p-profile p-active-profile"
                onClick={() => navigate("/profile")}
              >
                {" "}
                <FaUserEdit
                  style={{
                    fontSize: "24px",
                  }}
                />
                Personal Details
              </p>
              <p className="p-profile">
                {" "}
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
                {" "}
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
                {" "}
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
                {" "}
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
                {" "}
                <MdHelp
                  style={{
                    fontSize: "24px",
                  }}
                  className="profile-icons"
                />
                Help Desk
              </p>
              <p className="p-profile">
                {" "}
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
              {/* <div className="profile-menu-container">
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
              </div> */}
              <div className="functions-hider">
                <div className="div-display-functions">
                  <div
                    onClick={() => navigate("/profile")}
                    className="div-display-slider active-div-display-slider"
                  >
                    Personal Details
                  </div>
                  <div
                    onClick={() => navigate("/deliverydetails")}
                    className="div-display-slider"
                  >
                    Delivery Details
                  </div>
                  {/* <div
                    onClick={() => navigate("/bankdetails")}
                    className="div-display-slider"
                  >
                    Bank Details
                  </div>
                  <div className="div-display-slider">Verify</div> */}
                </div>
              </div>
              <h4
                style={{
                  marginBottom: "18px",
                  textAlign: "center",
                }}
                className="mobile-hide-profile"
              >
                Personal Details
              </h4>
              {/* <p>Account Name: {profile.account_name}</p>
            <p>Account Number: {profile.account_number}</p>
            <p>Address: {profile.address}</p>
            <p>Bank: {profile.bank}</p>
            <p>City: {profile.city}</p>
            <p>State: {profile.state}</p>
            <p>Street: {profile.street}</p> */}
              {/* <p>Photo: {profile.photo}</p> */}
              <div className="div-p-profile">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>First Name:</strong>
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.firstname? profile.firstname: 'No details Provided'}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Last Name:</strong>{" "}
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.lastname}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Middle Name:</strong>{" "}
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.middlename}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Email:</strong>{" "}
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.email}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Date of Birth:</strong>{" "}
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.dob}
                    </div>
                  </div>
                  {/* </div>
                <div> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Gender:</strong>{" "}
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.gender}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Phone Number:</strong>{" "}
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.phone_number
                        ? profile.phone_number
                        : "Enter a Phone Number"}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Referral Count:</strong>{" "}
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.referral_count}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Referral ID: </strong>{" "}
                    <div
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="div-lines-display"
                    >
                      {profile.referral_id}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <strong>Referral Link:</strong>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <input
                        style={{
                          border: "gray 1px solid",
                          padding: "12px 16px",
                          marginBottom: "20px",
                          marginTop: "3px",
                          color: "gray",
                          height: "50px",
                        }}
                        className="div-lines-display"
                        type="text"
                        value={profile.referral_link}
                        readOnly
                      />
                      <button
                        style={{
                          marginLeft: "10px",
                          padding: "8px 12px",
                          background: "transparent",
                          border: "none",
                          color: "blue",
                          cursor: "pointer",
                          position: "absolute",
                          right: 0,
                        }}
                        onClick={() => copyToClipboard(profile.referral_link)}
                      >
                        <RiFileCopy2Line />
                      </button>
                    </div>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <button
                        style={{
                          height: "50px",
                          padding: "12px 16px",
                          backgroundColor: "#064BDE",
                          border: "none",
                          color: "white",
                          borderRadius: "4px",
                        }}
                        onClick={() => navigate("/editdetails")}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <p>
              Two-Factor Authentication: {profile.two_factor_authentication}
            </p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
