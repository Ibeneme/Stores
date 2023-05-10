import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  // clearCart,
  getTotal,
} from "../../Slices/cartSlice";
import { useEffect } from "react";
import "./Cart.css";
import {BiMinus} from 'react-icons/bi'
import { MdAdd, MdDelete } from "react-icons/md";
import logo from './images/5购物渐变扁平矢量人物插画2420220903果冻_画板 1.png'
import Navbar from '../Navbar-and-Footer/Navbar'

const Cart = (cartItem) => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const decreaseInCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const increaseInCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  // const handleclearCart = (cartItem) => {
  //   dispatch(clearCart(cartItem));
  // };

  return (
    <div>
      <Navbar />
      <div
      style={{
        marginTop: "7em",
      }}
    >
      
      {cart.cartItems.length === 0 ? (
       <div
       style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
       }}>
         <div className="no-product">
          <p>Your Cart is currently empty</p>
          <br/>
          <img src={logo} alt="shopping"/>
          <br/> <br/>
          <button
          style={{
            width:'17em',
            height:'3.8em',
            borderRadius:'0.4em',
            border:'none',
            backgroundColor:'#386AEB',
            color:'white'
          }} onClick={() => navigate("/")}>Start shopping</button>
          <br/>
        </div>
        </div>
      ) : (

        <div
          className="spread"
        >
          <div>
            
            {cart.cartItems.map((cartItem) => {
              return (
          
              
                    <div className="cart-first-div" key={cartItem.id}>
                      
                      <div className="div-cart-first-div">
                        <img
                          className="img-cart-first-div"
                          src={cartItem.imageUrl} alt='cartitem'
                        />
                         <div className="hide-add"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              className="add-items"
                              onClick={() => decreaseInCart(cartItem)}
                            >
                              <BiMinus/>
                            </button>
                            <h4
                              style={{
                                width: '1em',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                marginLeft: "1em",
                                marginRight: "1em",
                              }}
                            >
                              {cartItem.cartQuantity}
                            </h4>
                            <button
                              className="add-items"
                              onClick={() => increaseInCart(cartItem)}
                            >
                             <MdAdd/>
                            </button>
                          </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginRight: "2em",
                            alignItems: "center",
                          }}
                        >
                          <h3 className="product-name"
>{cartItem.name}</h3>
                          {/* <button
                            className="clear-cart"
                            onClick={() => handleRemoveFromCart(cartItem)}
                          >
                            <span
                              style={{
                                fontSize: "1.3em",
                                marginTop: "0.2em",
                                marginRight: "0.1em",
                              }}
                            >
                              <MdDelete />{" "}
                            </span>
                            <span 
                            className="off-n-minus">Clear item
                              </span>
                          </button> */}
                          <button
                            className="show-delete-btn"
                            onClick={() => handleRemoveFromCart(cartItem)}
                          >
                            <span
                              style={{
                                fontSize: "1.3em",
                                marginTop: "0.2em",
                                marginRight: "0.1em",
                              }}
                            >
                              <MdDelete />{" "}
                            </span>
                          
                          </button>
                          
                        </div>

                        <p
                          style={{
                            color: "gray",
                            fontSize: "0.94em",
                          }}
                        >
                          {cartItem.title}
                        </p>

                        <div
                         className="mehnn"
                        >
                          <div
                          className="off-add-n-minus"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              className="add-items"
                              onClick={() => decreaseInCart(cartItem)}
                            >
                             <BiMinus />
                            </button>
                            <h4
                              style={{
                                width: '3em',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                marginLeft: "1em",
                                marginRight: "1em",
                              }}
                            >
                              {cartItem.cartQuantity}
                            </h4>
                            <button
                              className="add-items"
                              onClick={() => increaseInCart(cartItem)}
                            >
                             <MdAdd/>
                            </button>
                          </div>
                          <h2
                          className="h2-tired">
                            <span
                              style={{
                                fontSize: "0.6em",
                              }}
                            >
                              NGN
                            </span>
                            <span
                            className="product-name"
                            >{cartItem.price}</span>
                            
                            <span
                              style={{
                                fontSize: "0.6em",
                              }}
                            >
                              .00
                            </span>
                          </h2>
                        </div>

                        {/* <h2>
                   Total Price NGN{cartItem.price * cartItem.cartQuantity} 
                </h2> */}
                      </div>
                    </div>
               
            
              );
            })}
          </div>

          <div className="last-checkout-div">
            {/* <button onClick={() => handleclearCart(cartItem)}>
              clear cart
            </button> */}
            <h3>Cart Summary</h3>
            <br />
            <div style={{
              display:'flex',
              justifyContent:'space-between',
              borderTop:'0.03em solid #66666635',
              paddingTop:' 01.2em'
            }}>
               
            <div style={{
              display:'flex',
              flexDirection: 'column',
              
            }}>
             
               <h4>Cart Total </h4> 
               <p 
               className="product-title"style={{
                 
              color:'gray',
              
            }}>Delivery fees not included yet</p>

            </div>
                <h2><span
                              style={{
                                fontSize: "0.5em",
                              }}
                            >
                              NGN
                            </span>{cart.cartTotalAmount}
                            <span
                              style={{
                                fontSize: "0.5em",
                              }}
                            >
                              .00
                            </span></h2>
              </div>
            
              <br /> <br />
            <button 
            className="checkout-btn"
            onClick={() => navigate("/signup")}>Checkout</button>
          
          </div>
        </div>
      )}
    </div>
    </div>
   
  );
};

export default Cart;
