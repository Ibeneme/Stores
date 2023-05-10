import React from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import { useNavigate } from "react-router";


const ForgotPassword = () => {  
  const navigate = useNavigate()
    
  const validate = Yup.object({
    email: Yup.string()
    .email("Enter a Valid Email is invalid")
    .required("Email is Required"),
    password: Yup.string()
    .min(6, "Password must be at least 6 Characters")
    .required("Enter a Valid Password is required"),})

  return (
    <div>  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "white",
    }}
  >
    <Formik
      initialValues={{
        email: "",
        password: "",
    
       
      }}
      validationSchema={validate}
    >
      {(formik) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            src={logo}
            alt="logo"
          />
          <h2
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "0.5em",
            }}
          >
            {" "}
            ForgotPassword
          </h2>
          <p  style={{
            marginTop:"0.5em"
           
          }}>Please Enter your email to reset Password </p><br /> <br />
       
          <Form>
            <TextField label="Email Address" name="email" type="email" />
          
    <p style={{
              fontSize:'0.83em',
              display:'flex',
              flexDirection:'row',
              justifyContent:'flex-end'

            }}
            onClick={()=>navigate('/signin')}> Did you Remember your Password? Sign In</p>
            <br />
            {/* <TextField label="Email Address" name="email" type="email" />
              <TextField label="Date Of Birth" name="DateOfBirth" type="date" />
              <TextField
                label="Create Password"
                name="createPassword"
                type="password"
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              /> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <br />
              <button
                style={{
                  backgroundColor: "#386AEB",
                  height: "3.9em",
                  borderRadius: "0.4em",
                    border:'none',
                  color: "white",
                  fontSize:'1em',
              
                }}
                type="submit"

               
              >
                Next
              </button>
              <br /> <br /> <br />
              
            </div>

            {/* <button type='submit'>Reset</button> */}
          </Form>
        </div>
      )}
    </Formik>
  </div></div>
  )
}

export default ForgotPassword


