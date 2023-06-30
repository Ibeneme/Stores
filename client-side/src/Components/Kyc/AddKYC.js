import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKYCDetails } from "../../Slices/KYC/AddKycSlice";

const AddKYCForm = () => {
  const [kycType, setKYCType] = useState("");
  const [nin, setNIN] = useState("");
  const [bvn, setBVN] = useState("");
  const [proofType, setProofType] = useState("");
  const [proof, setProof] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.Addkyc.loading);
  const error = useSelector((state) => state.Addkyc.error);
  const success = useSelector((state) => state.Addkyc.success);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      kyc_type: kycType,
      nin: kycType === "NIN" ? nin : "",
      bvn: kycType === "BVN" ? bvn : "",
      proof_type: kycType === "NIN" ? "NIMC" : "Selfie",
      proof,
    };

    dispatch(addKYCDetails(payload));
  };

  return (
    <div>
      <h1>Add KYC Form</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>KYC details added successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="kycType">KYC Type:</label>
          <select id="kycType" value={kycType} onChange={(e) => setKYCType(e.target.value)}>
            <option value="">Select KYC Type</option>
            <option value="NIN">NIN</option>
            <option value="BVN">BVN</option>
          </select>
        </div>
        {kycType === "NIN" && (
          <div>
            <label htmlFor="nin">NIN:</label>
            <input type="text" id="nin" value={nin} onChange={(e) => setNIN(e.target.value)} />
          </div>
        )}
        {kycType === "BVN" && (
          <div>
            <label htmlFor="bvn">BVN:</label>
            <input type="text" id="bvn" value={bvn} onChange={(e) => setBVN(e.target.value)} />
          </div>
        )}
        <div>
          <label htmlFor="proofType">Proof Type:</label>
          <select id="proofType" value={proofType} onChange={(e) => setProofType(e.target.value)}>
            <option value="">Select Proof Type</option>
            {kycType === "NIN" ? (
              <>
                <option value="NIMC">NIMC</option>
                <option value="NINS">NINS</option>
              </>
            ) : (
              <option value="Selfie">Selfie</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="proof">Proof URL:</label>
          <input type="text" id="proof" value={proof} onChange={(e) => setProof(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddKYCForm
