import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cart from "./Components/Cart-and-Checkout/Cart";
import Product from "./Components/Products/Product";
import ProductPage from "./Components/Products/ProductPage";
import { ToastContainer } from "react-toastify";
import SignIn from "./Components/auth/SignIn";
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

import ProductListPublish from "./Components/Sellers/Publish";
import ProductListDrafts from "./Components/Sellers/drafts";

import { useDispatch } from "react-redux";
import { userProfile } from "./Slices/userSlice";
import SuccessPage from "./Components/Sellers/Pages/Success";
import CartComponent from "./Components/Cart-and-Checkout/Cart/Cart";
import AddToCartComponent from "./Slices/Cart/AddCart";
import SignupComponent from "./Components/Shipping/Shipping";
import Navbarr from "./Components/Navbar-and-Footer/Navbarr";
import UserProfileEdit from "./Components/profile/DetailsEdit";
import Footer from "./Components/Navbar-and-Footer/Footer";
import UpdateNameForm from "./Components/auth/nextSignUp";
import UserProfileDelivery from "./Components/profile/Delivery";
import UserProfileEditDelivery from "./Components/profile/update/DeliveryEdit";
import Orders from "./Components/Orders/Orders";
import Carta from "./Components/Cart-and-Checkout/Cart/Cart";
import CheckoutSingle from "./Components/Cart-and-Checkout/SingleCheckout";
import ViewOrder from "./Components/Orders/ViewOrder";
import PaidOrders from "./Components/Orders/PaidOrders";
import ShippedOrders from "./Components/Orders/ShippedOrders";
import ProcessingOrders from "./Components/Orders/ProcessingOrders";
import Disputes from "./Components/Orders/Disputes";
import Deliveredorders from "./Components/Orders/Deliveredorders";
import SellersOrder from "./Components/Sellers/Orders/SellersOrder";
import ViewSellers from "./Components/Sellers/Orders/ViewSellers";
import PaidSellers from "./Components/Sellers/Orders/PaidSellers";
import ShippedSellers from "./Components/Sellers/Orders/ShippedSellers";
import DisputesSellers from "./Components/Sellers/Orders/Disputes";
import DeliveredSellers from "./Components/Sellers/Orders/DeliveredSellers";
import PhotoInput from "./Components/Sellers/imagetest";
import Pay from "./Components/Cart-and-Checkout/payment/Pay";
import NewCart from "./Components/Cart-and-Checkout/Cart/newCart";
import CartActions from "./Components/Cart-and-Checkout/Cart/oldCart";
import ProductOld from "./Components/Cart-and-Checkout/Cart/productsCarts";
import Cartsss from "./Components/Cart-and-Checkout/Cart/cartss";
import SingleCartCheckout from "./Components/Cart-and-Checkout/SingleCartCheckout";
import { useLocation } from "react-router";
import NotFoundPage from "./Components/Cart-and-Checkout/Cart/404";
import Wallet from "./Components/Wallet/Wallet";
import Deposit from "./Components/Wallet/Deposit";
import Withdraw from "./Components/Wallet/Withdraw";

const ScrollToTop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return null;
};

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch(token);
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const location = useLocation();
  const pathsToHideNavbarr = [
    "/signin",
    "/signup",
    "/pidsignin",
    "/pidsignup",
    "/Signupnext",
    "/forgotPassword",
    "/verify",
    "/checkout",
  ];
  const shouldShowNavbarr = !pathsToHideNavbarr.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      {shouldShowNavbarr && <Navbarr />}

      <Routes>
        <Route path="/pidsignin" element={<PIDSignIn />} />
        <Route path="/pidsignup" element={<PIDSignUp />} />
        <Route path="/Signup" element={<SignupComponent />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Signupnext" element={<NextSignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verify" element={<Verify />} />

        <Route path="/*" element={<NotFoundPage />} />

        <Route path="/newcart" element={<NewCart />} />
        <Route path="/oldcart" element={<CartActions />} />
        <Route path="/testss" element={<ProductOld />} />
        <Route path="/test-cart" element={<Cartsss />} />
        <Route path="/checkout-one" element={<SingleCartCheckout />} />
        <Route path="/vieworder" element={<ViewOrder />} />
        <Route path="/sellersorder" element={<SellersOrder />} />
        <Route path="/viewsellers" element={<ViewSellers />} />
        <Route path="/paidsellers" element={<PaidSellers />} />
        <Route path="/shippedsellers" element={<ShippedSellers />} />
        <Route path="/Disputesellers" element={<DisputesSellers />} />
        <Route path="/deliveredsellers" element={<DeliveredSellers />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/addcart" element={<AddToCartComponent />} />
        <Route path="/editprofile" element={<ProfileNameForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/errorpage007aff" element={<SuccessPage />} />
        <Route path="/newcart" element={<CartComponent />} />
        <Route path="/editdetails" element={<UserProfileEdit />} />
        <Route path="/deliverydetails" element={<UserProfileDelivery />} />
        <Route path="/editdelivery" element={<UserProfileEditDelivery />} />
        <Route path="/single" element={<CheckoutSingle />} />
        <Route path="/paidorder" element={<PaidOrders />} />
        <Route path="/shippedorder" element={<ShippedOrders />} />
        <Route path="/processingorder" element={<ProcessingOrders />} />
        <Route path="/disputesorder" element={<Disputes />} />
        <Route path="/deliveredorder" element={<Deliveredorders />} />
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
        <Route path="/im" element={<PhotoInput />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/allratings" element={<RatingsPage />} />
        <Route path="/getrating" element={<GetRating />} />
        <Route path="/addrating" element={<AddRatings />} />
        <Route path="/editrating" element={<EditProductRatingForm />} />
        <Route path="/editseller" element={<EditProductForm />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/productdd" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<PaymentCheckout />} />
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
        <Route path="/orderr" element={<Orders />} />
        <Route path="/lesss" element={<UpdateNameForm />} />



        <Route path="/wallet" element={<Wallet />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
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
      <Footer />
    </>
  );
}

export default App;
