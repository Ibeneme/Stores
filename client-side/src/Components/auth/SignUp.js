import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser,  } from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isFocusedDateofBirth, setIsFocusedDateofBirth] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedFirstName, setIsFocusedFirstName] = useState(false);
  const [isFocusedLastName, setIsFocusedLastName] = useState(false);
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] = useState(false);
  const [isFocusedGender, setIsFocusedGender] = useState(false);
  const [isFocusedCountry, setIsFocusedCountry] = useState(false);

  const handleFocusGender = () => {
    setIsFocusedGender(true);
  };

  const handleBlurGender = () => {
    setIsFocusedGender(false);
  };

  const handleFocusCountry = () => {
    setIsFocusedCountry(true);
  };

  const handleBlurCountry = () => {
    setIsFocusedCountry(false);
  };

  const handleFocusDateofBirth = () => {
    setIsFocusedDateofBirth(true);
  };

  const handleBlurDateofBirth = () => {
    setIsFocusedDateofBirth(false);
  };



  const handleFocusFirstName = () => {
    setIsFocusedFirstName(true);
  };

  const handleBlurFirstName = () => {
    setIsFocusedFirstName(false);
  };

  const handleFocusLastName = () => {
    setIsFocusedLastName(true);
  };

  const handleBlurLastName = () => {
    setIsFocusedLastName(false);
  };

  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };

  const handleFocusConfirmPassword = () => {
    setIsFocusedConfirmPassword(true);
  };

  const handleBlurConfirmPassword = () => {
    setIsFocusedConfirmPassword(false);
  };

  const auth = useSelector((state) => state.auth);
  console.log(auth.userLoaded);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    country: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(registerUser(user));
      if (response.meta.requestStatus === "fulfilled") {
        const { email } = user;
        navigate(`/verify?email=${email}`);
      } else {
        console.log("Registration failed");
        console.log(response.data);
        setError("Please Re-Confirm your details");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // const googleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const result = await dispatch(signInWithGoogle(user));
  //     if (result.type === signInWithGoogle.fulfilled.toString()) {
  //       navigate("/");
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "",
        weight: "100vw",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "2em",
        paddingRight: "2em",
        paddingTop: "8em",
        paddingBottom: "12em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          height: "",
          weight: "100vw",
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
            width: "3em",
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
          Sign Up with HydraXpress
        </h2>
        <p style={{ marginTop: "0.5em" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#386AEB", cursor: "pointer" }}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
        <br />
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            {" "}
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              First Name
            </label>
            <input
              onFocus={handleFocusFirstName}
              onBlur={handleBlurFirstName}
              autoComplete="on"
              name="firstname"
              placeholder="First name"
              type="text"
              className="input-forms"
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            />
            {isFocusedFirstName ? (
              <p
                style={{
                  marginTop: "-1.5em",
                  marginBottom: "1.3em",
                  fontSize: "0.8em",
                  color: "#386AEB",
                }}
              >
                First Name is required
              </p>
            ) : null}
          </div>
          <div>
            {" "}
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              Last Name
            </label>
            <input
              onFocus={handleFocusLastName}
              onBlur={handleBlurLastName}
              autoComplete="on"
              name="name"
              placeholder="Last Name"
              type="text"
              className="input-forms"
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
            {isFocusedLastName ? (
              <p
                style={{
                  marginTop: "-1.5em",
                  marginBottom: "1.3em",
                  fontSize: "0.8em",
                  color: "#386AEB",
                }}
              >
                Last Name is required
              </p>
            ) : null}
          </div>
          <div>
            {" "}
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              Email
            </label>
            <input
              autoComplete="on"
              name="email"
              placeholder="Email"
              type="text"
              className="input-forms"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div>
            {" "}
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              Gender
            </label>
            <input
                onFocus={handleFocusGender}
                onBlur={handleBlurGender}
              autoComplete="on"
              name="gender"
              placeholder="Gender"
              type="text"
              className="input-forms"
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            />
              {isFocusedGender ? (
              <p
                style={{
                  marginTop: "-1.5em",
                  marginBottom: "1.3em",
                  fontSize: "0.8em",
                  color: "#386AEB",
                }}
              >
                Either Male or Female
              </p>
            ) : null}
          </div>
          <div>
            {" "}
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              Country
            </label>
            <input
                onFocus={handleFocusCountry}
                onBlur={handleBlurCountry}
              autoComplete="on"
              name="country"
              placeholder="Country"
              type="text"
              className="input-forms"
              onChange={(e) => setUser({ ...user, country: e.target.value })}
            />
              {isFocusedCountry ? (
              <p
                style={{
                  marginTop: "-1.5em",
                  marginBottom: "1.3em",
                  fontSize: "0.8em",
                  color: "#386AEB",
                }}
              >
                Service available only in Nigeria 
              </p>
            ) : null}
          </div>
          <div>
            {" "}
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              Date of birth
            </label>
            <input
               onFocus={handleFocusDateofBirth}
               onBlur={handleBlurDateofBirth}
              autoComplete="on"
              name="dob"
              placeholder="Date of Birth"
              type="date"
              className="input-forms"
              onChange={(e) => setUser({ ...user, dob: e.target.value })}
            />
              {isFocusedDateofBirth ? (
              <p
                style={{
                  marginTop: "-1.5em",
                  marginBottom: "1.3em",
                  fontSize: "0.8em",
                  color: "#386AEB",
                }}
              >
                You must be above 18years of age 
              </p>
            ) : null}
          </div>
          <div style={{ position: "relative" }}>
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              Password
            </label>
            <input
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
              autoComplete="on"
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="input-forms"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {isFocusedPassword ? (
              <p
                style={{
                  marginTop: "-1.5em",
                  marginBottom: "1.3em",
                  fontSize: "0.8em",
                  color: "#386AEB",
                }}
              >
                Minimum of 8 characters Uppercase, Lowercase, Numbers & special character 
              </p>
            ) : null}
            <button
              type="button"
              onClick={togglePasswordVisibility} // Attach onClick event handler
              style={{
                position: "absolute",
                top: "50%",
                right: "1em",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <label
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              Confirm Password
            </label>
            <input
              onFocus={handleFocusConfirmPassword}
              onBlur={handleBlurConfirmPassword}
              autoComplete="on"
              name="confirmPassword"
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              className="input-forms"
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />{" "}
            {isFocusedConfirmPassword ? (
              <p
                style={{
                  marginTop: "-1.5em",
                  marginBottom: "1.3em",
                  fontSize: "0.8em",
                  color: "#386AEB",
                }}
              >
                Both Passwords Must Match
              </p>
            ) : null}
            <button
              type="button"
              onClick={togglePasswordVisibility} // Attach onClick event handler
              style={{
                position: "absolute",
                top: "50%",
                right: "1em",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button
            style={{
              backgroundColor: "#386aeb",
              color: "white",
              border: "none",
              borderRadius: "0.5em",
              marginTop: "2em",
            }}
            className="input-forms"
          >
            {auth.registerStatus === "pending" ? "Loading...." : "Submit"}
          </button>
          <br />{" "}
          {error ? (
            <p
              style={{
                backgroundColor: "#FF000029",
                color: "#FF0000",
                height: "2.4em",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1em",
                borderLeft: "0.3em red solid",
                marginBottom: "0.9em",
                width: "100%",
              }}
            >
              {error}
            </p>
          ) : null}
        </div>
      </form>
      <br />
      <p style={{ display: "flex", justifyContent: "center" }}>Or</p>
      <br /> <br />
      <button
        style={{
          backgroundColor: "black",

          border: "0.7em",
          color: "white",
          borderRadius: "0.3em",
        }}
        className="input-forms"
        onClick={() => navigate("/pidsignup")}
      >
        Sign in with Passcoder
      </button>
      {/* <button
        style={{
          backgroundColor: "#66666635",

          border: "0.7em",
          color: "black",
          marginTop: "0.8em",
        }}
        className="input-forms"
        onClick={googleSubmit}
      >
        Sign in with Google
      </button> */}
    </div>
  );
};

export default SignUp;
