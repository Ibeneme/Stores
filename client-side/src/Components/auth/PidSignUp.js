import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../../Components/Navbar-and-Footer/image/Vector.png";
import "./auth.css";
import { signupPasscoder } from "../../Slices/auth/signUpSlice";

const PIDSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState('');
  const [formData, setFormData] = useState({
    country: "",
    pid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(signupPasscoder(formData)).unwrap();
      console.log(data, "Signup successful");
      setFormData({
        country: "",
        pid: "",
      });
      setFormErrors();
    } catch (error) {
      console.log(error, "comperr");
      setFormErrors(error.message);

    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        weight: "100vw",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "2em",
        paddingRight: "2em",
        paddingTop: "19em",
        paddingBottom: "12em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          height: "100vh",
          weight: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
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
        </div>
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
          Create an account with Passcoder
        </h2>
        <p
          style={{
            marginTop: "0.5em",
            marginBottom: "3em",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <span
            style={{ color: "#386AEB", cursor: "pointer" }}
            onClick={() => navigate("/pidsignin")}
          >
            Sign In with Passcoder
          </span>
        </p>

        {formErrors ? (
          <p
            style={{
              textAlign: "left",
              padding: "12px",
              backgroundColor: "#ff000021",
              color: "red",
              marginBottom: "2em",
            }}
          >
          {formErrors === 'Validation Error Occured'? 'Country and PID required': 'Passcoder ID already exists!'}
          </p>
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input-forms"
          >
            <option value="">Select Country</option>
            <option value="Nigeria">Nigeria</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="pid">PID</label>
          <input
            type="text"
            id="pid"
            name="pid"
            className="input-forms"
            value={formData.pid}
            onChange={handleChange}
            placeholder="Passcoder ID"
          />
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
        >
          Signup
        </button>
      </form>
      <br />
      <br /> <br />
    </div>
  );
};

export default PIDSignUp;
