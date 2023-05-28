import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import TextField from "./Input-components/TextField";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import { useNavigate } from "react-router";
import { signupRequest } from "../../Slices/authSlice/signupSlice";

const PIDSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.signup);

  const validate = Yup.object({
    pid: Yup.string()
      .max(5, "Must be 5 Characters")
      .required("Your Passcoder ID is required"),
    country: Yup.string().required("Your Country is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/auth/user/signup/via/passcoder",
        {
          forAddingViaPID: true,
          userSignUpViaPasscoder: {
            country: values.country,
            pid: values.pid,
          },
        }
      );

      console.log(values);
      dispatch(signupRequest());
      console.log(values);
    } catch (error) {
      console.log(error);
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
            pid: "",
            country: "",
     
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
            <Form>
              <br />{" "}
              <TextField 
            
              label="Country" name="country"   type="text" />
              <br />{" "}
              <br />{" "}
              <TextField
                
                label="Passcoder ID"
                name="pid"
                type="text"
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
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  Next
                </button>
                <br /> <br />{" "}
             
                <br />
                <br />
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default PIDSignUp;
