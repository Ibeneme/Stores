import { signupUser } from "../../Slices/auth/signUpSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SignupComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

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
    setFormData({ ...formData, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error for the corresponding field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
      .unwrap()
      .then((data) => {
        console.log(data);
        setFormData({
          country: '',
          firstname: '',
          middlename: '',
          lastname: '',
          email: '',
          phone_number: '',
          gender: '',
          dob: '',
          password: '',
          confirmPassword: '',
        });
        setFormErrors({});
      })
      .catch((error) => {
        if (error.payload && Array.isArray(error.payload)) {
          const errors = error.payload.reduce((acc, err) => {
            acc[err.param] = err.msg;
            return acc;
          }, {});
          console.log(errors, 'comperrr');
          setFormErrors(errors);
        } else {
          console.log(error, 'comperr');
          setFormErrors({ general: error });
        }
      });
  };
  
  

  return (
    <div>
      <h2>Signup</h2>
      {error && <div>Error: {error.data}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            // required
          />
            {formErrors[0] && formErrors[0].param === 'country' && (
          <div className="error">{formErrors[0].msg}</div>
        )}
        </div>
        <div>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            // required
          />
          {formErrors.firstname && (
            <div className="error">{formErrors.firstname}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
            placeholder="Middle Name"
            // required
          />
          {formErrors.middlename && (
            <div className="error">{formErrors.middlename}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            // required
          />
          {formErrors.lastname && (
            <div className="error">{formErrors.lastname}</div>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            // required
          />
          {formErrors.email && <div className="error">{formErrors.email}</div>}
        </div>
        <div>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            // required
          />
          {formErrors.phone_number && (
            <div className="error">{formErrors.phone_number}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            // required
          />
          {formErrors.gender && (
            <div className="error">{formErrors.gender}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            // required
          />
          {formErrors.dob && <div className="error">{formErrors.dob}</div>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            // required
          />
          {formErrors.password && (
            <div className="error">{formErrors.password}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            // required
          />
          {formErrors.confirmPassword && (
            <div className="error">{formErrors.confirmPassword}</div>
          )}
        </div>
        <button type="submit" disabled={loading}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupComponent;
