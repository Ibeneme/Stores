import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfilePhone,
  updateProfileName,
  updateProfileDetails,
  updateProfileAddress,
  updateProfileBankAccount,
  updateProfilePhoto
} from "../../../Slices/Users/update/NameSlice";
import { fetchUserProfile } from "../../../Slices/Users/ProfileSlice";
import { useNavigate } from "react-router";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { loading: nameLoading, error: nameError, success: nameSuccess } = useSelector(
    (state) => state.profileName
  );
  const { loading: phoneLoading, error: phoneError, success: phoneSuccess } = useSelector(
    (state) => state.profilePhone
  );
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState(""); // Add this line
  const [bankName, setBankName] = useState("");
   const [photo, setPhoto] = useState(null); // Add state for t

  const navigate = useNavigate();

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();

    const nameData = {
      firstname: formatName(firstName),
      middlename: formatName(middleName),
      lastname: formatName(lastName),
    };

    try {
      await dispatch(updateProfileName(nameData));
      if (!nameError) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    const phoneData = {
      phone_number: phoneNumber,
    };

    try {
      await dispatch(updateProfilePhone(phoneData));
      if (!phoneError) {
        navigate("/profile");
        dispatch(fetchUserProfile());
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
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

  const handleAddressSubmit = async (e) => {
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
      if (!nameError) {
        console.log("Address updated successfully!");
        // Handle success case
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };
  
  const handleBankAccountSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the bank account data from the form inputs
    const bankAccountData = {
      // Add the necessary fields here based on your form inputs
      // For example:
      account_name: accountName,
      account_number: accountNumber,
    bank: bankName,
      // ...
    };
  
    try {
      await dispatch(updateProfileBankAccount(bankAccountData));
      // Handle success case if needed
    } catch (error) {
      console.log("Error updating bank account:", error);
      // Handle error case if needed
    }
  };
  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
  
    if (!photo) {
      console.log("Photo is required");
      return;
    }
  
    // Validate if the selected file is an image
    if (!photo.type.startsWith("image/")) {
      console.log("Selected file is not an image");
      return;
    }
  
    // Generate a unique identifier for the image
    const uniqueId = Math.random().toString(36).substring(7);
  
    // Construct the URL path for the image
    const imageUrl = `http://example.com/images/${uniqueId}.png`;
  
    const formData = {
      photo: imageUrl,
    };
  
    try {
      await dispatch(updateProfilePhoto(formData));
      // Handle success case if needed
    } catch (error) {
      console.log("Error updating profile photo:", error);
      // Handle error case if needed
    }
  };
  
  

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]); // Set the selected file as the photo state
  };

  // ...
  return (
    <div>
      <h2>Update Profile Name</h2>
      <form onSubmit={handleNameSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Middle Name</label>
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit" disabled={nameLoading}>
          Update Name
        </button>
        {nameLoading && <p>Loading...</p>}
        {nameError && <p>Error: {nameError.message}</p>}
        {nameSuccess && <p>Name updated successfully!</p>}
      </form>

      <h2>Update Phone Number</h2>
      <form onSubmit={handlePhoneSubmit}>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit" disabled={phoneLoading}>
          Update Phone
        </button>
        {phoneLoading && <p>Loading...</p>}
        {phoneError && <p>Error: {phoneError.message}</p>}
        {phoneSuccess && <p>Phone number updated successfully!</p>}
      </form>

      <h2>Update Profile Details</h2>
      <form onSubmit={handleDetailsSubmit}>
        <div>
          <label>Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <button type="submit">Update Details</button>
      </form>

      <h2>Update Address</h2>
      <form onSubmit={handleAddressSubmit}>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Street:</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <button type="submit">Update Address</button>
      </form>

      <h2>Update Bank Account</h2>
<form onSubmit={handleBankAccountSubmit}>
  {/* Add form inputs for bank account information */}
  <div>
    <label>Account Number</label>
    <input
      type="text"
      value={accountNumber}
      onChange={(e) => setAccountNumber(e.target.value)}
    />
  </div>

  <div>
    <label>Account Name</label>
    <input
      type="text"
      value={accountName}
      onChange={(e) => setAccountName(e.target.value)}
    />
  </div>

  <div>
    <label>Bank Name</label>
    <input
      type="text"
      value={bankName}
      onChange={(e) => setBankName(e.target.value)}
    />
  </div>
  {/* ...Add more fields as needed */}
  
  <button type="submit">Update Bank Account</button>
</form>
<div>
      {/* ...existing code... */}

      <h2>Update Profile Photo</h2>
      <form onSubmit={handlePhotoSubmit}>
        <div>
          <label>Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <button type="submit">Update Photo</button>
      </form>
    </div>


    </div>
  );
};

export default ProfileForm;
