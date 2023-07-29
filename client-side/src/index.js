import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { productsApi } from "./Slices/Products/productAPI";
import { CartsApi } from "./Slices/Cart/CartQuery";
import "react-toastify/dist/ReactToastify.css";
import productsReducer from "./Slices/productsSlice";
import authReducer, { loadUser } from "./Slices/authSlice";
import forgotPasswordReducer from "./Slices/Users/ForgotPasswordSlice";
import { BrowserRouter } from "react-router-dom";
import productSliceReducer from "../src/Slices/Products/productSlice";
import categorySliceReducer from "./Slices/Products/CategoriesSlices";
import locationSliceReducer from "./Slices/Products/LocationSlice";
import categoriesLocationsFetchSliceReducer from "./Slices/Products/CategoriesLocationSlices";
import searchSliceReducer from "./Slices/Products/SearchAllProductsSlice";
import userProfileReducer from "./Slices/userSlice";
import addproductReducer from "./Slices/Sellers/addProductSlice";
import draftproductReducer from "./Slices/Sellers/draftProductSlice";
import sellersProductsDetailsReducer from "./Slices/Sellers/SellersProductDetailsSlice";
import productPublishReducer from "./Slices/Sellers/SellersProductDetailsSlice";
import deleteProductReducer from "./Slices/Sellers/deleteProductSlice";

import Modal from "react-modal";
import { sellersproductApi } from "./Slices/Sellers/productSlice";
import favoritesReducer from "./Slices/favorites/FavSlices";
import { fetchFavorites } from "./Slices/favorites/FavSlices";
import favoriteReducer from "./Slices/favorites/GetFavoriteSlice";
import toggleFavoriteReducer from "./Slices/favorites/ToggleFavoriteSlice";
import deleteFavoriteReducer from "./Slices/favorites/DeleteSlice";

import profileReducer from "./Slices/Users/ProfileSlice";
import profileNameReducer from "./Slices/Users/update/NameSlice";
import profilePhoneReducer from "./Slices/Users/update/NameSlice";
import detailsReducer from "./Slices/Users/update/NameSlice";
import addressReducer from "./Slices/Users/update/NameSlice";
import accountReducer from "./Slices/Users/update/NameSlice";

import ratingsReducer from "./Slices/Ratings/AllRatingsSlices";
import ratingReducer from "./Slices/Ratings/RatingsSlices";
import addRatingReducer from "./Slices/Ratings/RatingsSlices";
import editratingsReducer from "./Slices/Ratings/EditRatingSlice";
import { editProductReducer } from "./Slices/Sellers/edit/editName";
import { editCategoryReducer } from "./Slices/Sellers/edit/editCategory";
import editDescriptionReducer from "./Slices/Sellers/edit/EditDescription";
import editPricesReducer from "./Slices/Sellers/edit/priceSlice";
import { locationReducer } from "./Slices/Sellers/edit/LocationSlice";
import specificationsReducer from "./Slices/Sellers/edit/editSpecificationsSlices";
import stockReducer from "./Slices/Sellers/edit/stockSlice";
import editAllReducer from "./Slices/Sellers/edit/editAllSlice";
import productImageReducer from "./Slices/Sellers/Image/AddImageSlice";
import productImageSliceReducer from "./Slices/Sellers/Image/EditImageSlice";

import deleteImageSliceReducer from "./Slices/Sellers/Image/deleteImageSlice";
import authSigninReducer from "./Slices/auth/signinSlice";
import authSignUpReducer from "./Slices/auth/signUpSlice";
import cartsReducer from "./Slices/Cart/CartSlice";
import shippingReducer from "./Slices/Shipping/Shipping";
import shippingSliceReducer, {
  fetchAllShippingData,
} from "./Slices/Shipping/ShippingSlice";

import usersReducer from "../src/Slices/orders/OrderSlice";
import disputeSliceReducer, {
  fetchAllDisputes,
  fetchDisputesByOrderUniqueId,
  createNewDispute,
} from "./Slices/Disputes/Disputes";
import ordersInternalSliceReducer from "./Slices/orders/SellersOrders/OrdersSellersSlice";
import transactionSliceReducer from "./Slices/Transaction/TransactionSlice";
import kycSliceReducer from './Slices/KYC/KYCSlice'
import cartReducer from './Slices/cartSlice'

const saveStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = JSON.stringify(store.getState());
  localStorage.setItem("reduxState", state);
  return result;
};

const store = configureStore({
  reducer: {
    cart: cartReducer, 

    shipping: shippingReducer,
    shippingSlice: shippingSliceReducer,
    disputeSlice: disputeSliceReducer,
    ordersInternalSlice: ordersInternalSliceReducer,
    transactionSlice: transactionSliceReducer,

    authSignin: authSigninReducer,
    authSignUp: authSignUpReducer,
    auth: authReducer,
    carts: cartsReducer,
    profile: profileReducer,
    profileName: profileNameReducer,
    profilePhone: profilePhoneReducer,
    details: addressReducer,
    address: detailsReducer,
    account: accountReducer,
    kyc: kycSliceReducer,

    users: usersReducer,
    ratings: ratingsReducer,
    rating: ratingReducer,
    addrating: addRatingReducer,
    editratings: editratingsReducer,

    addproduct: addproductReducer,
    draftProduct: draftproductReducer,
    sellersProductsDetails: sellersProductsDetailsReducer,
    productPublish: productPublishReducer,
    deleteProduct: deleteProductReducer,
    productImage: productImageReducer,

    favorites: favoritesReducer,
    favorite: favoriteReducer,
    toggleFavorite: toggleFavoriteReducer,
    deleteFavorite: deleteFavoriteReducer,

    editProduct: editProductReducer,
    editCategory: editCategoryReducer,
    editDescription: editDescriptionReducer,
    editPrices: editPricesReducer,
    location: locationReducer,
    specifications: specificationsReducer,
    stock: stockReducer,
    editAll: editAllReducer,
    productImages: productImageSliceReducer,
    deleteImage: deleteImageSliceReducer,

    product: productsReducer,
    productsDetails: productSliceReducer,
    categories: categorySliceReducer,
    locations: locationSliceReducer,
    CategoriesLocations: categoriesLocationsFetchSliceReducer,
    search: searchSliceReducer,
    userProfile: userProfileReducer,
    forgotPassword: forgotPasswordReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [sellersproductApi.reducerPath]: sellersproductApi.reducer,
    [CartsApi.reducerPath]: CartsApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      saveStateMiddleware,
      sellersproductApi.middleware,
      productsApi.middleware,
      CartsApi.middleware
    );
  },
});

store.dispatch(fetchFavorites());
store.dispatch(loadUser(null));

// ...

Modal.setAppElement("#root"); // Set the app element to the root element of your React app

// ...
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     products: productReducer,
//     cart: cartReducer,
//     product: productsReducer,
//     forgotPassword:forgotPasswordReducer,
//     [productsApi.reducerPath]: productsApi.reducer,
//   },

//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(productsApi.middleware);

//   },
// });

reportWebVitals();
