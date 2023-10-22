import { signupUser } from "../../Slices/auth/signUpSlice";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";

const SignupComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [thisError, setThisError] = useState("");

  const [formData, setFormData] = useState({
    country: "",
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone_number: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      const formattedValue = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formattedValue });
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } else {
      setFormData({ ...formData, [name]: value });
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    const numericValue = phoneNumber.replace(/\D/g, "");
    if (numericValue.startsWith("234")) {
      return `+${numericValue}`;
    }
    if (numericValue.startsWith("0") && numericValue.length === 11) {
      return `+234${numericValue.slice(1)}`;
    }
    return phoneNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(signupUser(formData)).unwrap();
      navigate(`/verify?email=${formData.email}`);
      console.log(data);
      setFormData({
        country: "",
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        phone_number: "",
        gender: "",
        dob: "",
        password: "",
        confirmPassword: "",
      });
      setFormErrors({});
    } catch (error) {
      setThisError(error.message);
      console.log(error, "comperr");
      setFormErrors(error.data);
    }
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
          textAlign: "center",
        }}
      >
        Sign Up with HydraXpress
      </h2>
      <p style={{ marginTop: "0.5em", textAlign: "center" }}>
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
      {error && <div>Error: {error.data}</div>}
      {thisError ? (
        <p
          className="input-forms"
          style={{
            backgroundColor: "#ff000021",
            color: "red",
            height: "fit-content",
            padding: "12px 12px",
            border: "none",
          }}
        >
          {" "}
          {thisError}
        </p>
      ) : null}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Country</label>

          <select
            id="country"
            name="country"
            onChange={handleChange}
            className="input-forms"
          >
            <option value="">Select Country</option>
            <option value="Nigeria">Nigeria</option>
          </select>
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "country") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="input-forms"
            placeholder="First Name"

            // required
          />
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "firstname") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Middle Name</label>
          <input
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
            className="input-forms"
            placeholder="Middle Name"
            // required
          />
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "middlename") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="input-forms"
            placeholder="Last Name"
            // required
          />
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "lastname") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-forms"
            placeholder="Email"
            // required
          />
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "email") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}{" "}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="input-forms"
            placeholder="Phone Number"
            // required
          />
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "phone_number") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Gender</label>
          <select
            id="gender"
            name="gender"
            onChange={handleChange}
            className="input-forms"
          >
            {" "}
            <option value="">Select Option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "gender") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Date of Birth</label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className="input-forms"
            placeholder="Date of Birth"
            // required
          />
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "dob") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}{" "}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ position: "relative" }}>
            <label style={{ display: "flex", justifyContent: "flex-start" }}>
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-forms"
              placeholder=" Enter a Password"
              // required
            />
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
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </button>
          </div>
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "confirmPassword") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ position: "relative" }}>
            <label style={{ display: "flex", justifyContent: "flex-start" }}>
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-forms"
              placeholder="Confirm Password"
              // required
            />
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
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </button>
          </div>
          {formErrors &&
            Object.values(formErrors).map((error) => {
              if (error.param === "confirmPassword") {
                return (
                  <div key={error.param} className="error">
                    {error.msg}
                  </div>
                );
              }
              return null;
            })}
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
          type="submit"
          disabled={loading}
        >
          Signup
        </button>
        {thisError ? (
          <p
            className="input-forms"
            style={{
              backgroundColor: "#ff000021",
              color: "red",
              height: "fit-content",
              padding: "12px 12px",
              border: "none",
            }}
          >
            {" "}
            {thisError}
          </p>
        ) : null}
      </form>
      <br />
      <p style={{ display: "flex", justifyContent: "center" }}>Or</p>
      <br /> <br />
      <button
        onClick={() => navigate("/pidsignup")}
        style={{
          backgroundColor: "#000",
          color: "white",
          border: "none",
          borderRadius: "0.5em",
          marginTop: "2em",
        }}
        className="input-forms"
        type="submit"
        disabled={loading}
      >
        Signup With Passcoder
      </button>
    </div>
  );
};

export default SignupComponent;
