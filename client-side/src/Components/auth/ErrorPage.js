import React, { useState } from 'react';
import axios from 'axios';

const KYCVerificationForm = () => {
  const [kycType, setKYCType] = useState('');
  const [nin, setNIN] = useState('');
  const [bvn, setBVN] = useState('');
  const [proofType, setProofType] = useState('');
  const [proof, setProof] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      kyc_type: kycType,
      nin: kycType === 'NIN' ? nin : '',
      bvn: kycType === 'BVN' ? bvn : '',
      proof_type: proofType,
      proof: proof,
    };

    axios
      .post('https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc/add', requestBody)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        console.log(response.data);
      })
      .catch((error) => {
        setSuccessMessage('');
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
          console.log(error);
        } else {
          setErrorMessage('An error occurred while submitting the KYC verification.');
          console.log(error);
        }
      });
  };

  return (
    <div>
      <h2>KYC Verification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="kycType">KYC Type:</label>
          <select id="kycType" value={kycType} onChange={(e) => setKYCType(e.target.value)} required>
            <option value="">Select KYC Type</option>
            <option value="NIN">NIN</option>
            <option value="BVN">BVN</option>
          </select>
        </div>
        {kycType === 'NIN' && (
          <div>
            <label htmlFor="nin">NIN:</label>
            <input type="text" id="nin" value={nin} onChange={(e) => setNIN(e.target.value)} required />
          </div>
        )}
        {kycType === 'BVN' && (
          <div>
            <label htmlFor="bvn">BVN:</label>
            <input type="text" id="bvn" value={bvn} onChange={(e) => setBVN(e.target.value)} required />
          </div>
        )}
        <div>
          <label htmlFor="proofType">Proof Type:</label>
          <select id="proofType" value={proofType} onChange={(e) => setProofType(e.target.value)} required>
            <option value="">Select Proof Type</option>
            {kycType === 'NIN' && (
              <>
                <option value="NIMC">NIMC</option>
                <option value="NINS">NINS</option>
              </>
            )}
            {kycType === 'BVN' && <option value="Selfie">Selfie</option>}
          </select>
        </div>
        <div>
          <label htmlFor="proof">Proof:</label>
          <input type="text" id="proof" value={proof} onChange={(e) => setProof(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default KYCVerificationForm;
