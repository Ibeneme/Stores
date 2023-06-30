import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { performKYCVerification } from '../../Slices/KYC/KYCSlice';

const KYCForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.kyc.loading);
  const error = useSelector((state) => state.kyc.error);
  const success = useSelector((state) => state.kyc.success);

 
  useEffect(() => {
    dispatch(performKYCVerification());
  }, [dispatch]);

  return (
    <div>
      <form>
        {/* Form inputs */}
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error occurred while performing KYC verification.</div>}
      {success && <div>KYC verification successful!</div>}
    </div>
  );
};


export default KYCForm;
