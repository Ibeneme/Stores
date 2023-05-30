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
import VendorHome from "./Vendor-interface/Vendor-Signin/VendorHome";
import VendorSignUp from "./Vendor-interface/auth/VendorSignUp";
import VendorSignIn from "./Vendor-interface/auth/VendorSignIn";
import VendorNextSignUp from "./Vendor-interface/auth/VendornextSignUp";
import VendorForgotPassword from "./Vendor-interface/auth/VendorForgotPassword";
import VendorVerify from "./Vendor-interface/auth/VendorVerify";
import PIDSignUp from "./Components/auth/Pid";

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
          <Route path="/pid" element={<PIDSignUp />} />
          <Route path="/pid-signup" element={<PIDSignUp />} />




          <Route path="/vendorhome" element={<VendorHome />} />
          <Route path="/vendorSignup" element={<VendorSignUp />} />
          <Route path="/vendorSignin" element={<VendorSignIn />} />
          <Route path="/vendorSignnext" element={<VendorNextSignUp />} />
          <Route path="/vendorforgot" element={<VendorForgotPassword />} />
          <Route path="/vendorverify" element={<VendorVerify />} />

        </Routes>
   
      </BrowserRouter>
    </>
  );
}

export default App;
