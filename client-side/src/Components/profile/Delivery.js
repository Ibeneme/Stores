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
import Loader from "../Loader/Loader";

const UserProfileDelivery = () => {
  const dispatch = useDispatch();
  const { loading, profile, error } = useSelector((state) => state.profile);

  const navigate = useNavigate();

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
              <p className="p-profile " onClick={() => navigate("/profile")}>
                {" "}
                <FaUserEdit
                  style={{
                    fontSize: "24px",
                  }}
                />
                Personal Details
              </p>
              <p className="p-profile p-active-profile">
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
              <div className="functions-hider">
                <div className="div-display-functions">
                  <div
                    onClick={() => navigate("/profile")}
                    className="div-display-slider"
                  >
                    Personal Details
                  </div>
                  <div
                    onClick={() => navigate("/deliverydetails")}
                    className="div-display-slider active-div-display-slider"
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
                Delivery Details
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
                  }}
                >
                  <strong>Address:</strong>
                  <div
                    style={{
                      border: "gray 1px solid",
                      padding: "12px 16px",
                      marginBottom: "20px",
                      marginTop: "3px",
                      color: "gray",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                    className="div-lines-display"
                  >
                    {profile.address
                      ? profile.address
                      : "No details Provided yet, edit to fill"}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <strong>City:</strong>{" "}
                  <div
                    style={{
                      border: "gray 1px solid",
                      padding: "12px 16px",
                      marginBottom: "20px",
                      marginTop: "3px",
                      color: "gray",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="div-lines-display"
                  >
                    {profile.city
                      ? profile.city
                      : "No details Provided yet, edit to fill"}
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
                  <strong>Street:</strong>{" "}
                  <div
                    style={{
                      border: "gray 1px solid",
                      padding: "12px 16px",
                      marginBottom: "20px",
                      marginTop: "3px",
                      color: "gray",
                      height: "auto",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                    className="div-lines-display"
                  >
                    {profile.street
                      ? profile.street
                      : "No details Provided yet, edit to fill"}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <strong>State:</strong>{" "}
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
                    {profile.state
                      ? profile.state
                      : "No details Provided yet, edit to fill"}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
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
                    marginTop: 24,
                  }}
                  onClick={() => navigate("/editdelivery")}
                >
                  Edit Profile
                </button>
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

export default UserProfileDelivery;
