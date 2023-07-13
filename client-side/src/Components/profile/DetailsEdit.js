import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Slices/Users/ProfileSlice";
import "./profile.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeliveryDining, MdMail, MdVerified, MdHelp } from "react-icons/md";
import { RiBankFill, RiLockPasswordFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FcFaq } from "react-icons/fc";
import { useNavigate } from "react-router";
import {
  updateProfileName,
  updateProfileDetails,
} from "../../Slices/Users/update/NameSlice.js";
import Loader from "../Loader/Loader";

const UserProfileEdit = () => {
  const dispatch = useDispatch();
  const { loading, profile } = useSelector((state) => state.profile);
  const { error: nameError } = useSelector((state) => state.profileName) || {};

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
 
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameData = {
      firstname: formatName(firstName),
      middlename: formatName(middleName),
      lastname: formatName(lastName),
  };
  
  try {
      const response = await dispatch(updateProfileName(nameData));
      if (response.success) {
        navigate("/profile");
      }
  } catch (error) {
      console.error("Error updating name:", error);
  }
  
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();

    const detailsData = {
      gender: formatName(gender),
      dob: dob,
    };

    try {
      await dispatch(updateProfileDetails(detailsData));
    } catch (error) {
      console.error("Error updating profile details:", error);
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

  const firstnameError = nameErrors.find(
    (error) => error.param === "firstname"
  );
  console.log(firstnameError);

  const middlenameError = nameErrors.find(
    (error) => error.param === "middlename"
  );
  console.log(middlenameError);

  const lastnameError = nameErrors.find((error) => error.param === "lastname");
  console.log(lastnameError);

  const genderError = nameErrors.find((error) => error.param === "gender");
  console.log(genderError);

  const dobError = nameErrors.find((error) => error.param === "dob");
  console.log(dobError);

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
              <p
                className="p-profile p-active-profile"
                onClick={() => navigate("/profile")}
              >
                <FaUserEdit
                  style={{
                    fontSize: "24px",
                  }}
                />
                Personal Details
              </p>
              <p className="p-profile">
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
                  marginBottom:'3em'
                }}
                className="h4-details"
              >
                Personal Details
              </h4>
              <div className="div-p-profile">
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>First Name:</strong>
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
                      placeholder="Enter a First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <p className="error">{firstnameError?.msg}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>Last Name:</strong>
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
                      placeholder="Enter a Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <p className="error">{lastnameError?.msg}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>Middle Name:</strong>
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
                      placeholder="Enter a Middle Name"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                    <p className="error">{middlenameError?.msg}</p>
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
                <form onSubmit={handleDetailsSubmit}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>Date of Birth:</strong>
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
                      type="date"
                      placeholder={profile.dob}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                    <p className="error">{dobError?.msg}</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>Gender:</strong>
                    <select
                      style={{
                        border: "gray 1px solid",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        marginTop: "3px",
                        color: "gray",
                        height: "50px",
                      }}
                      className="div-lines-display"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select an Option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <p className="error">{genderError?.msg}</p>

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

export default UserProfileEdit;
