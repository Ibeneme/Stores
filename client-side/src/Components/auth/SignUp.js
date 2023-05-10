import React from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 12 Characters or less")
      .required("Your First name is required"),
    lastName: Yup.string()
      .max(15, "Must be 12 Characters or less")
      .required("Your Last name is required"),
  });
  return (
    <div
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
            {console.log(formik.values)}
            <Form>
              <TextField label="First Name" name="firstName" type="text" />
              <br />
              <TextField label="Last Name" name="lastName" type="text" />
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
                <br /> <br />
                <button
                  style={{
                    backgroundColor: "#386AEB",
                    height: "3.4em",
                    borderRadius: "0.4em",
                    border: "none",
                    color: "white",
                  }}
                  type="submit"
                  onClick={() => navigate("/signupnext")}
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
                    height: "3.9em",

                    color: "white",
                    borderRadius: "0.4em",
                    border: "none",
                  }}
                  type="submit"
                >
                  Sign in with Passcoder
                </button>
                <button
                  style={{
                    backgroundColor: "#66666635",
                    height: "3.9em",
                    borderRadius: "0.4em",
                    border: "none",
                    color: "black",

                    marginTop: "0.8em",
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
    </div>
  );
};

export default SignUp;
