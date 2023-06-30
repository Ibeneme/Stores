import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const OTP = () => {
    const auth = useSelector((state) => state.auth);
    const token = auth.token
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const headers = {
          "hydra-express-access-token": token,
        };

        const response = await axios.post(
          "https://us-central1-hydra-express.cloudfunctions.net/app/user/profile",
          token,
          { headers }
        );

        const userData = response.data.data;
        console.log(JSON.stringify(response.data.data));


        localStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>OTP
        <button>
            submit
        </button>
    </div>
  )
}

export default OTP