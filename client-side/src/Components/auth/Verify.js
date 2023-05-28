import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { otpVerify } from '../../Slices/authSlice/verifySignOtp';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.verification);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const [otp, setOTP] = useState('');

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handlesendVerification = async () => {
    try {
      const response = await axios.post(
        `https://us-central1-hydra-express.cloudfunctions.net/app/auth/user/signin/via/email/otp/verify`,
        { email, otp } // Pass email and otp as request payload
      );
      dispatch(otpVerify(otp));
      console.log('OTP verification successful:', response);
      navigate('/success'); // Redirect to success page after successful verification
    } catch (error) {
      // Handle OTP verification failure
      console.error('OTP verification error:', error);
    }
  };

 
    return (
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2>OTP Verification</h2>
            <p>Verification Email: {email}</p>
            <label htmlFor="otp">Enter OTP:</label>
            <input type="text" id="otp" value={otp} onChange={handleOTPChange} />
            <button onClick={handlesendVerification} disabled={loading}>
              Verify OTP
            </button>
            {error && <p>Error: {error}</p>}
            {success && <p>OTP verification successful!</p>}
          </>
        )}
      </div>
    );
    
 
};

export default MyComponent;
