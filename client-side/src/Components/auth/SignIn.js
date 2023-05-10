import React from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import { useNavigate } from "react-router";


const SignIn = () => {
  const navigate = useNavigate()
    
  const validate = Yup.object({
    email: Yup.string()
    .email("Enter a Valid Email is invalid")
    .required("Email is Required"),
    password: Yup.string()
    .min(6, "Password must be at least 6 Characters")
    .required("Enter a Valid Password is required"),

  });
     
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
            SignUp with HydraXpress
          </h2>
          <p  style={{
            marginTop:"0.5em"
           
          }}>Do not have an account? <span 
           style={{
            color: "#386AEB",
           
          }}
          onClick={()=>navigate('/signup')} 
          
          >Sign Up</span></p><br /> <br />
          {console.log(formik.values)}
          <Form>
            <TextField label="Email Address" name="email" type="email" />
            <br/>
            <TextField label="Password" name="password" type="password" />
            <p style={{
              fontSize:'0.9em',
              display:'flex',
              flexDirection:'row',
              justifyContent:'flex-end'

            }}
            onClick={()=>navigate('/forgotPassword')}  >Forgot Password?</p>
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
                  height: "3.4em",
                  border: "0.7em",
                  color: "white",
              
                }}
                type="submit"

               
              >
                Next
              </button>
              <br /> <br /> <br />
              <button
                style={{
                  backgroundColor: "black",
                  height: "3.4em",
                  border: "0.7em",
                  color: "white",
       
                  borderRadius: "0.3em",
                }}
                type="submit"
              >
                Sign in with Passcode
              </button>
              <button
                style={{
                
                  height: "3.4em",
                  border: "0.7em",
                  color: "black",
                
                  marginTop:'0.8em'
                }}
                type="submit"
              >
                Sign in with Google
              </button>
            </div>

            {/* <button type='submit'>Reset</button> */}
          </Form>
        </div>
      )}
    </Formik>
  </div></div>
  )
}

export default SignIn
