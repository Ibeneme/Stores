

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import TextField from "./Input-components/TextField";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import { useNavigate } from "react-router";
import { signupRequest } from "../../Slices/authSlice/signupSlice";
import { loginWithGoogle } from "../../Slices/authSlice/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,  } = useSelector((state) => state.signup);

  const validate = Yup.object({
    gender: Yup.string()
    .max(6, "Must Either Male or Female")
    .required("Must Either Male or Female"),

    firstname: Yup.string()
      .max(15, "Must be 12 Characters or less")
      .required("Your First name is required"),
    lastname: Yup.string()
      .max(15, "Must be 12 Characters or less")
      .required("Your Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
 
    dob: Yup.date().required("Date of Birth is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const handleGoogleLogin = async () => {
    try {
      const result = await dispatch(loginWithGoogle());
      if (result.type === "auth/loginWithGoogle/fulfilled") {
        // Navigate to the checkout page after successful authentication
        navigate("/checkout");
      } else {
        // Handle authentication failure
        console.log("Google authentication error:", result.error);
      }
    } catch (error) {
      // Handle any errors that occur during authentication
      console.log("Google authentication error:", error);
    }
  };

  const handleSubmit = async (userSignUp) => {
    try {
      await axios.post("https://us-central1-hydra-express.cloudfunctions.net/app/auth/user/signup", userSignUp); 
      console.log(userSignUp)// Replace "/api/signup" with your actual signup endpoint URL
      dispatch(signupRequest());
      navigate("/signin"); // Navigate to the next page upon successful signup
    } catch (error) {
      console.log(error); // Handle the error appropriately
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100%",
        backgroundColor: "white",
        paddingBottom: "10em",
        paddingTop: "10em",
      }}
    >
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          dob: "",
          password: "",
          confirmPassword: "",
          gender: "",
          country: "",
   
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
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
              Sign Up to HydraXpress
            </h2>
            <p
              style={{
                marginTop: "0.5em",
              }}
            >
              Already have an account?{" "}
              <span
                style={{
                  color: "#386AEB",
                }}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </p>
            <br /> <br />
          
            <Form>
              <TextField label="First Name" name="firstname" type="text" />
              <br />
              <TextField label="Last Name" name="lastname" type="text" />
              <br />{" "}
              <TextField label="Email Address" name="email" type="email" />
              <br />{" "}
              <TextField label="Date Of Birth" name="dob" type="date" />
              <br />{" "}
              <TextField 
              style={{
                color: 'gray',
                border: '0.145em solid gray'
              }}
              label="Country" name="country"  value='Nigeria' type="text" />
              <br />{" "}
              <TextField label="Gender" name="gender" 
               />
              <br />{" "}
              <TextField
                label="Create Password"
                name="password"
                type="password"
              />
              <br />{" "}
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
                <br /> <br />
                <button
                  style={{
                    backgroundColor: "#386AEB",
                    height: "3.1em",
                    borderRadius: "0.4em",
                    border: "none",
                    color: "white",
                    fontSize: "1em",
                  }}
                  disabled={loading}
                  type="submit"
                >
                  Next
                </button>
                <br /> <br />{" "}
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Or
                </p>
                <br />
                <br />
                <button
                  style={{
                    backgroundColor: "black",
                    height: "3.1em",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "0.4em",
                    border: "none",
                    width:'100%'
                  }}
                  onClick={()=>navigate('/pid')}
                >
                  Sign in with Passcoder
                </button>
                <button
                  style={{
                    backgroundColor: "#66666635",
                    height: "3.1em",
                    borderRadius: "0.4em",
                    border: "none",
                    fontSize: "01em",
                    color: "black",

                    marginTop: "0.8em",
                  }}
                  onClick={handleGoogleLogin}
                >
                  Sign in with Google
                </button>
              </div>
            </Form>
            <div>
               <div style={{
              display:'flex',
              flexDirection:'column',
              width:'100%'
            }}>
           
            </div>
            </div>
           
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
