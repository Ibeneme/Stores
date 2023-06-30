import React, { useState } from 'react';
import axios from 'axios';

const KYCVerification = () => {
  const [verificationResult, setVerificationResult] = useState('');

  const verifyKYC = async (kycData) => {
    try {
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc/add',
        kycData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Process the response data
      setVerificationResult('KYC verification successful');
      console.log('KYC verification successful:', response.data);
    } catch (error) {
      // Handle error response
      setVerificationResult('KYC verification failed');
      console.log('KYC verification failed:', error.response.data);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Example KYC data
    const kycData = {
      kyc_type: event.target.kycType.value,
      nin: event.target.nin.value,
      bvn: event.target.bvn.value,
      proof_type: event.target.proofType.value,
      proof: event.target.proof.value,
    };

    // Call the verifyKYC function with the KYC data to initiate verification
    verifyKYC(kycData);
  };

  return (
    <div>
      <h2>KYC lol Verification</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="kycType">KYC Type:</label>
        <input type="text" id="kycType" required />
        <br />
        <label htmlFor="nin">NIN:</label>
        <input type="text" id="nin" required />
        <br />
        <label htmlFor="bvn">BVN:</label>
        <input type="text" id="bvn" required />
        <br />
        <label htmlFor="proofType">Proof Type:</label>
        <input type="text" id="proofType" required />
        <br />
        <label htmlFor="proof">Proof:</label>
        <input type="file" id="proof" required />
        <br />
        <br />
        <button type="submit">Verify KYC</button>
      </form>
      <p>{verificationResult}</p>
    </div>
  );
};

export default KYCVerification;
