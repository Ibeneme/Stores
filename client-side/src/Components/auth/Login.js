import React from "react";
import { Formik, Form, } from "formik";
import * as Yup from "yup";
import TextField from "./Input-components/TextField";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";


const LoginUserr = () => {
  const navigate = useNavigate

  // const { loading, error, success } = useSelector((state) => state.signup);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 Characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
  
    navigate('/')
 
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
            paddingTop:'7em',
          backgroundColor: "white",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
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
                Sign In with HydraXpress
              </h2>
              <p style={{ marginTop: "0.5em" }}>
                Do not have an account?{" "}
                <span
                  style={{ color: "#386AEB", cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </p>
              <br /> <br />
              <Form>
                <TextField label="Email Address" name="email" type="email" />
                <br />
                <TextField label="Password" name="password" type="password" />
                <br />

                <p
                  style={{
                    fontSize: "0.9em",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/forgotPassword")}
                >
                  Forgot Password?
                </p>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <br />
                  <br />
                  <button
                    style={{
                      backgroundColor: "#386AEB",
                      height: "3.1em",
                      border: "0.7em",
                      color: "white",
                      fontSize: "1em",
                    }}
                    type="submit"
                  >
                    Next
                  </button>
                  <br />
                  <br />
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    Or
                  </p>
                  <br />
                  <br />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
  
};

export default LoginUserr