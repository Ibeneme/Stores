import { useDispatch } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Modal from "../auth/Modal/Modal";
import logo from "./Modal/mail with a frosted glass effect.png";
import verify from "./Modal/restangle speech bubble with check mark.png";

const MyComponent = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewModalOpen, setNewModalOpen] = useState(false);


  const handleCloseModal = () => {
    setModalOpen(false);
  };
 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const [error, setError] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const handleResendVerification = async () => {
    try {
      const response = await axios.post(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/email/verify`,
        { email }
      );
    

      console.log(response.data);
      console.log(response.data.message);

      if (response.data.message === "User email verified successfully") {
        setModalOpen(true);
        setError(`${email}`);
        setErrorContent("Email verified successfully please proceed to home");
      }
      if (response.data.message === "User email already verified") {
        setNewModalOpen(true);
        setErrorContent(
          `Your email address ${email} has been already verified`
        );
        setError(`Email Already Verified`);
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error.response.data);
      navigate("/");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection:'column',
      justifyContent: "center",
      alignItems: "center",
      textAlign:'center',
      backgroundColor:'white',
      width:'100vw',
      height:'100vh'

    }}>
      <div  style={{
            display: "flex",
            flexDirection:'column',
            justifyContent: "center",
            alignItems: "center",
            marginTop:'',
            backgroundColor:'white',
          
          
  
          }}>
      {/* <img
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "3em",
           
          }}
          src={logoH}
          alt="logo"
        /> */}
        <h2
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0.5em",
          }}
        ><br />
          Click to Verify your account on Hydra Express
        </h2>
        <p style={{ marginTop: "0.9em" }}>
          Having any issues? {" "}
          <span
            style={{ color: "#386AEB", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
        <img 
      style={{
        width:'250px',
        padding:'3em',
      }}
      src={verify} alt={verify} />
       <br />  <br />
      <button 
     
        style={{
          backgroundColor: "#386aeb",
          marginTop: "0.3em",
          color: "white",
          padding: "1em",
          border: "none",
          width:'90%',
          fontSize: "0.9em",
          borderRadius: "0.3em",
        }}

    
      onClick={handleResendVerification}>
        Click to Verify
      </button>
      </div>

      <br /> 
     
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "centre",
          }}
        >
          <h3
            style={{
              marginTop: "0.5em",
              textAlign: "centre",
            }}
          >
            {error}
          </h3>
          <p
            style={{
              color: "#00000075",
              marginTop: "0.3em",
              marginBottom: "2.4em",
              textAlign: "center",
              fontSize: "0.9em",
            }}
          >
            {errorContent}
          </p>
          <img
            style={{
              width: "200px",
              margin: "2.4em 0",
            }}
            src={logo}
            alt={verify}
          />
          <button
            style={{
              backgroundColor: "#386aeb",
              marginTop: "0.3em",
              color: "white",
              width: "100%",
              padding: "1em",
              border: "none",
              fontSize: "0.9em",
              borderRadius: "0.3em",
            }}
            onClick={() => navigate("/signin")}
          >
            Proceed to Login
          </button>
        </div>
      </Modal>

      <Modal isOpen={isNewModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "centre",
          }}
        >
          <h3
            style={{
              marginTop: "0.5em",
              textAlign: "centre",
            }}
          >
            {error}
          </h3>
          <p
            style={{
              color: "#00000075",
              marginTop: "0.3em",
              marginBottom: "2.4em",
              textAlign: "center",
              fontSize: "0.9em",
            }}
          >
            {errorContent}
          </p>
          <img
            style={{
              width: "200px",
              margin: "2.4em 0",
            }}
            src={logo} alt={verify}
          />
          <button
            style={{
              backgroundColor: "#386aeb",
              marginTop: "0.3em",
              color: "white",
              width: "100%",
              padding: "1em",
              border: "none",
              fontSize: "0.9em",
              borderRadius: "0.3em",
            }}
            onClick={() => navigate("/signup")}
          >
            Back to Sign In
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyComponent;
