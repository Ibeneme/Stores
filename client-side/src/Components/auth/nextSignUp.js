
import React from "react";
import { Formik, Form } from "formik";
import TextField from "./Input-components/TextField";
import * as Yup from "yup";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import { useNavigate } from "react-router";

const NextSignUp = () => {
      
  const validate = Yup.object({
    email: Yup.string()
    .email("Enter a Valid Email is invalid")
    .required("Email is Required"),
  DateOfBirth: Yup.string()
    .max(15, "Must be 12 Characters or less")
    .required("Required"),
  createPassword: Yup.string()
    .min(6, "Password must be at least 6 Characters")
    .required("Enter a Valid Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is Required"),

  });

  const navigate = useNavigate()
  return (
    <div> <div
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
        firstName: "",
        lastName: "",
        middleName: "",
       
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
            Sign Up with HydraXpress
          </h2>
          <p>Already have an account? <span 
           style={{
            color: "#386AEB",
           
          }}
          onClick={()=>navigate('/signin')} 
          
          >Sign In</span></p><br /> <br />
          {console.log(formik.values)}
          <Form>
           <TextField label="Email Address" name="email" type="email" />
           <br /> <TextField label="Date Of Birth" name="DateOfBirth" type="date" />
              <br />  <TextField
                label="Create Password"
                name="createPassword"
                type="password"
              /> <br />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              /> 
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
                  height: "3.5em",
                  border: "0.7em",
                  color: "white",
               
                }}
                type="submit"

                onClick={()=>navigate('/checkout')}
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

export default NextSignUp
