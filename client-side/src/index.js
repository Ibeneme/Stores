import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer, { productsFetch } from "./Slices/productSlice";
import { productsApi } from "./Slices/productAPI";
import cartReducer, { getTotal } from './Slices/cartSlice'
import 'react-toastify/dist/ReactToastify.css'
import productsReducer from './Slices/productsSlice'
import signupReducer from "./Slices/authSlice/signupSlice";
import authReducer from './Slices/authSlice/authSlice'; 
import verificationReducer from './Slices/authSlice/emailVerificationSlice';
import signinSlice from "./Slices/authSlice/signinSlice";

import otpVerifyReducer from "./Slices/authSlice/verifySignOtp";
import forgotPasswordReducer from './Slices/authSlice/EmailresetPassword'
import otpReducer from './Slices/authSlice/createOtp'

  
  
const store = configureStore({
  reducer: {
    verification: verificationReducer,
    products: productReducer,
    cart: cartReducer,
    signup: signupReducer,
    signIn: signinSlice,
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    otp: otpReducer,
    verificationOTP: otpVerifyReducer,
    product: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});


store.dispatch(productsFetch());
store.dispatch(getTotal());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
