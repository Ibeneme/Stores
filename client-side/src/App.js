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
import Footer from "./Components/Navbar-and-Footer/Footer";


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
          <Route path="/next" element={<NextSignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
