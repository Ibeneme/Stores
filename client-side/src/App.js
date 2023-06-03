import "./App.css";
import { Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart-and-Checkout/Cart";
import Product from "./Components/Products/Product";
import ProductPage from "./Components/Products/ProductPage";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import ForgotPassword from "./Components/auth/ForgotPassword";
import Verify from "./Components/auth/Verify";
import Carousels from "./Components/Navbar-and-Footer/Carousel";
import NextSignUp from "./Components/auth/nextSignUp";
import Checkout from "./Components/Cart-and-Checkout/Checkout";
import PaymentCheckout from "./Components/Cart-and-Checkout/Payment";
import Testing from "./Components/auth/Modal/SuccessModal";
import Failed from "./Components/auth/Modal/Failed";
import PIDSignIn from "./Components/auth/Pid";
import PIDSignUp from "./Components/auth/PidSignUp";
import LoginUserr from "./Components/auth/Login";
import VendorHome from "./Components/VendorUI/VendorHome";




function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Product />}/>
            
            <Route path="/carousel" element={<Carousels />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductPage />} />
         

          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Signupnext" element={<NextSignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<PaymentCheckout />} />
          <Route path="/pidsignin" element={<PIDSignIn />} />
          <Route path="/pidsignup" element={<PIDSignUp />} />
          <Route path="/test" element={<Testing />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="/login" element={<LoginUserr />} />
          <Route path="/vendor" element={<VendorHome />} />







        </Routes>
   
      </BrowserRouter>
    </>
  );
}

export default App;
