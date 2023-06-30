// App.js (or any other component where you want to access the Redux store)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Slices/Users/ProfileSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, profile, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {profile && (
        <div>
          <h2>User Profile</h2>
          <p>Account Name: {profile.account_name}</p>
          <p>Account Number: {profile.account_number}</p>
          <p>Address: {profile.address}</p>
          <p>Bank: {profile.bank}</p>
          <p>City: {profile.city}</p>
          <p>Date of Birth: {profile.dob}</p>
          <p>Email: {profile.email}</p>
          <p>First Name: {profile.firstname}</p>
          <p>Gender: {profile.gender}</p>
          <p>Last Name: {profile.lastname}</p>
          <p>Middle Name: {profile.middlename}</p>
          <p>Phone Number: {profile.phone_number}</p>
          <p>Photo: {profile.photo}</p>
          <p>Referral Count: {profile.referral_count}</p>
          <p>Referral ID: {profile.referral_id}</p>
          <p>Referral Link: {profile.referral_link}</p>
          <p>State: {profile.state}</p>
          <p>Street: {profile.street}</p>
          <p>Two-Factor Authentication: {profile.two_factor_authentication}</p>
          <p>User Unique ID: {profile.user_unique_id}</p>
          <p>Verified: {profile.verified}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
