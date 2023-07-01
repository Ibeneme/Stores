import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cart from "./Components/Cart-and-Checkout/Cart";
import Product from "./Components/Products/Product";
import ProductPage from "./Components/Products/ProductPage";
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

import { useEffect } from "react";
import Categories from "./Components/Products/Categories";
import Location from "./Components/Products/Location";
import CategoriesLocations from "./Components/Products/CategoriesLocations";
import Search from "./Components/Products/SearchProducts/Search";
import SearchForm from "./Components/Products/SearchProducts/SearchForm";
import Rating from "./Components/Rating/Rating";
import ProductList from "./Components/Sellers/Product";
import AddProductForm from "./Components/Sellers/addProduct";
import SellersProductPage from "./Components/Sellers/SellersProductPage";
import ProductPublishPage from "./Components/Sellers/publishProduct";
import ProductDeletePage from "./Components/Sellers/delete";
import UserProfile from "./Components/profile/Profile";
import ProfileNameForm from "./Components/profile/update/Name";
import FavoritesComponent from "./Components/favorite/fav";
import FavoritePage from "./Components/favorite/GetFavorite";
import FavoritesToggle from "./Components/favorite/Toggle";
import FavoriteItem from "./Components/favorite/deleteFav";
import RatingsPage from "./Components/Rating/AllRatings";
import GetRating from "./Components/Rating/GetRatings";
import AddRatings from "./Components/Rating/Rating";
import EditProductForm from "./Components/Sellers/edit/EditProductForm";
import EditCategoryForm from "./Components/Sellers/edit/Categories";
import EditPricesForm from "./Components/Sellers/edit/Price";
import LocationForm from "./Components/Sellers/edit/Location";
import EditSpecificationsForm from "./Components/Sellers/edit/Specifications";
import StockForm from "./Components/Sellers/edit/Stock";
import EditAllForm from "./Components/Sellers/edit/editAll";
import ProductImageForm from "./Components/Sellers/addImage";
import ProductImageFormEdit from "./Components/Sellers/edit/editImage";
import DeleteProductImageForm from "./Components/Sellers/deleteImage";
import EditProductRatingForm from "./Components/Rating/EditRatings";
import KYCForm from "./Components/Kyc/Kyc";
import AddKYCForm from "./Components/Kyc/AddKYC";
import ProductListPublish from "./Components/Sellers/Publish";
import ProductListDrafts from "./Components/Sellers/drafts";

import { useDispatch } from "react-redux";
import { userProfile } from "./Slices/userSlice";
import SuccessPage from "./Components/Sellers/Pages/Success";
import CartComponent from "./Components/Cart-and-Checkout/Cart/Cart";
import AddToCartComponent from "./Slices/Cart/AddCart";

const ScrollToTop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return null;
};



function App() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch(token);
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  return (
    <>
    
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/addcart" element={< AddToCartComponent/>} />

        <Route path="/editprofile" element={<ProfileNameForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/errorpage007aff" element={<SuccessPage />} />
        <Route path="/newcart" element={<CartComponent />} />

        <Route path="/" element={<Product />} />
        <Route path="/carousel" element={<Carousels />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product?" element={<ProductPage />} />
        <Route path="/category?" element={<Categories />} />
        <Route path="/location?" element={<Location />} />
        <Route path="/category/location?" element={<CategoriesLocations />} />
        <Route path="/searchproducts" element={<Search />} />
        <Route path="/searchForm" element={<SearchForm />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/favorite" element={<FavoritesComponent />} />
        <Route path="/getfavorite" element={<FavoritePage />} />
        <Route path="/togglefavorite" element={<FavoritesToggle />} />
        <Route path="/deletefavorite" element={<FavoriteItem />} />

        <Route path="/allratings" element={<RatingsPage />} />
        <Route path="/getrating" element={<GetRating />} />
        <Route path="/addrating" element={<AddRatings />} />
        <Route path="/editrating" element={<EditProductRatingForm />} />

        <Route path="/editseller" element={<EditProductForm />} />

        <Route path="/productdd" element={<ProductPage />} />
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

        <Route path="/sellersproductsdisplay" element={<ProductList />} />
        <Route path="/addProducts" element={<AddProductForm />} />
        <Route path="/sellersproduct" element={<SellersProductPage />} />
        <Route path="/publishproduct" element={<ProductPublishPage />} />
        <Route path="/deleteproduct" element={<ProductDeletePage />} />
        <Route path="/addimage" element={<ProductImageFormEdit />} />

        <Route path="/publish" element={<ProductListPublish />} />
        <Route path="/drafts" element={<ProductListDrafts />} />

        <Route path="/categoryedit" element={<EditCategoryForm />} />
        <Route path="/editprice" element={<EditPricesForm />} />
        <Route path="/editlocation" element={<LocationForm />} />
        <Route
          path="/editspecifications"
          element={<EditSpecificationsForm />}
        />
        <Route path="/editstocks" element={<StockForm />} />
        <Route path="/editall" element={<EditAllForm />} />
        <Route path="/editimage" element={<ProductImageForm />} />
        <Route path="/deleteimage" element={<DeleteProductImageForm />} />

        <Route path="/kyc" element={<KYCForm />} />
        <Route path="/addkyc" element={<AddKYCForm />} />

        {/* <Route path="/profile" element={<UpdateNameForm/>} /> */}
        {/* <Route path="/editprofile" element={<UpdateNameFormEdit/>} />
       
        <Route path="/testin" element={<UpdateNameFormTesting/>} />
        <Route path="/ootp" element={<OTP/>} />
        <Route path="/editName" element={<EditName/>} />
        <Route path="/editaddress" element={<EditAddress/>} />
        <Route path="/editbank" element={<EditBank/>} />
        <Route path="/bankprofile" element={<BankProfile/>} />
        <Route path="/deliveryprofile" element={<DeliveryProfile/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/pendingorders" element={<PendingOrders/>} />
        <Route path="/deliveredorders" element={<DeliveryOrders/>} />
        <Route path="/kyec" element={<KYCVerification/>} />
        <Route path="/car" element={<Slider/>} />
        <Route path="/sea" element={<ProductSearch/>} /> */}
      </Routes>
    </>
  );
}

export default App;
