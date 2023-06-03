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
import authReducer, { loadUser } from './Slices/authSlice'; 
import forgotPasswordReducer from './Slices/Users/ForgotPasswordSlice'


const saveStateMiddleware = store => next => action => {
  const result = next(action);
  const state = JSON.stringify(store.getState());
  localStorage.setItem('reduxState', state);
   return result;
 };

 
 const store = configureStore({
   reducer: {
     auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    product: productsReducer,
     forgotPassword:forgotPasswordReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  
   middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(saveStateMiddleware, productsApi.middleware);
    
  },
});
 
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

store.dispatch(productsFetch());
store.dispatch(getTotal());
store.dispatch(loadUser(null));

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
