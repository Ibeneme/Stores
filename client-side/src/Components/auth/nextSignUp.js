// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from "react-redux";

// const UpdateEmailForm = () => {
//   const [email, setEmail] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const auth = useSelector((state) => state.auth);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const token = auth.token
//     axios
//       .put('https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/email', { email },
//       {
//         headers: {
//           "hydra-express-access-token": token,
//         }
//       })
//       .then((response) => {

//         setSuccessMessage(response.data.message);
//         setErrorMessage('');
//         setEmail('');
//         console.log(response.data)
//       })
//       .catch((error) => {

//         setSuccessMessage('');
//         if (error.response && error.response.data && error.response.data.message) {
//           setErrorMessage(error.response.data.message);
//           console.log(error)
//         } else {
//           setErrorMessage('An error occurred while updating the email.');
//           console.log(error)
//         }
//       });
//   };

//   return (
//     <div>
//       <h2>Update Email</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">New Email:</label>
//           <input type="email" id="email" value={email} onChange={handleEmailChange} required />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//     </div>
//   );
// };

// export default UpdateEmailForm;

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateNameForm = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.userProfile);
  const [isTwoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bank, setBank] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [photo, setPhoto] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleToggle = () => {
    const token = auth.token;
    const endpoint =
      "https://us-central1-hydra-express.cloudfunctions.net/app/user/2fa/toggle";

    axios
      .put(
        endpoint,
        { two_factor_authentication: !isTwoFactorAuthEnabled },
        {
          headers: {
            "hydra-express-access-token": token,
          },
        }
      )
      .then((response) => {
        setTwoFactorAuthEnabled(!isTwoFactorAuthEnabled);
        setSuccessMessage(response.data.message);
        window.location.reload();
        setErrorMessage("");
        console.log(response.data);
      })
      .catch((error) => {
        setSuccessMessage("");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
          console.log(error);
        } else {
          setErrorMessage(
            "An error occurred while toggling two-factor authentication."
          );
          console.log(error);
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = auth.token;
    const data = {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
    };

    axios
      .put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/name",
        data,
        {
          headers: {
            "hydra-express-access-token": token,
          },
        }
      )
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        setSuccessMessage("");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
          console.log(error);
        } else {
          setErrorMessage("An error occurred while updating the name.");
          console.log(error);
        }
      });
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
  };

  const handleBankChange = (e) => {
    setBank(e.target.value);
  };

  const handleSubmitBank = (e) => {
    e.preventDefault();
    const token = auth.token;
    const endpoint =
      "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/bank/account";

    axios
      .put(
        endpoint,
        {
          account_number: accountNumber,
          account_name: accountName,
          bank: bank,
        },
        {
          headers: {
            "hydra-express-access-token": token,
          },
        }
      )
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        setAccountNumber("");
        setAccountName("");
        setBank("");
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        setSuccessMessage("");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
          console.log(error);
        } else {
          setErrorMessage(
            "An error occurred while updating the bank account information."
          );
          console.log(error);
        }
      });
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmitInformation = (e) => {
    e.preventDefault();
    const token = auth.token;
    const endpoint =
      "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile/address";

    axios
      .put(
        endpoint,
        {
          address: address,
          street: street,
          city: city,
          state: state,
        },
        {
          headers: {
            "hydra-express-access-token": token,
          },
        }
      )
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        setAddress("");
        setStreet("");
        setCity("");
        setState("");
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        setSuccessMessage("");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
          console.log(error);
        } else {
          setErrorMessage(
            "An error occurred while updating the address information."
          );
          console.log(error);
        }
      });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
  };

  const handleSubmitPhoto = (e) => {
    e.preventDefault();
    const token = auth.token;
    const endpoint =
      "https://us-central1-hydra-express.cloudfunctions.net/app/user/phone/verify";

    axios
      .put(
        endpoint,
        {
          photo: photo,
        },
        {
          headers: {
            "hydra-express-access-token": token,
          },
        }
      )
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        setPhoto("");
        console.log(response.data);
      })
      .catch((error) => {
        setSuccessMessage("");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
          console.log(error);
        } else {
          setErrorMessage(
            "An error occurred while updating the profile photo."
          );
          console.log(error);
        }
      });
  };
  return (
    <div>
      <div>
    <p>{profile.userData.gender}</p>
    <p>{profile.userData.dob}</p>
    <p>{profile.userData.lastname}</p>
    <p>{profile.userData.middlename}</p>
    <p>{profile.userData.firstname}</p>
    <p>{profile.userData.state}</p>
    <p>{profile.userData.address}</p>
    <p>{profile.userData.street}</p>
    <p>{profile.userData.account_number}</p>
    <p>{profile.userData.account_name}</p>
    <p>{profile.userData.bank}</p>
   
        </div>
      <div>
        <h2>Update Profile Photo</h2>
        <form onSubmit={handleSubmitPhoto}>
          <div>
            <label htmlFor="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              value={photo}
              onChange={handlePhotoChange}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <h2>Update Name</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="middleName">Middle Name:</label>
          <input
            type="text"
            id="middleName"
            value={middleName}
            onChange={handleMiddleNameChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div>
        <h2>Toggle Two-Factor Authentication</h2>
        <button onClick={handleToggle}>
          {isTwoFactorAuthEnabled ? "Disable" : "Enable"}
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div>
        <h2>Update Bank Account Information</h2>
        <form onSubmit={handleSubmitBank}>
          <div>
            <label htmlFor="accountNumber">Account Number:</label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              required
            />
          </div>
          <div>
            <label htmlFor="accountName">Account Name:</label>
            <input
              type="text"
              id="accountName"
              value={accountName}
              onChange={handleAccountNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="bank">Bank:</label>
            <input
              type="text"
              id="bank"
              value={bank}
              onChange={handleBankChange}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div>
        <h2>Update Address Information</h2>
        <form onSubmit={handleSubmitInformation}>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div>
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={handleStreetChange}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={handleCityChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={handleStateChange}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UpdateNameForm;
