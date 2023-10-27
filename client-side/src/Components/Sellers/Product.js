import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./styles/product.css";
import logo from "../Cart-and-Checkout/images/5购物渐变扁平矢量人物插画2420220903果冻_画板 1.png";
import ShimmerLoader from "../Loader/Shima";
import { fetchProduct } from "../../Slices/Sellers/SellersProductDetailsSlice";

const ProductList = () => {
  const navigate = useNavigate();
  const handleClick = (unique_id) => {
    navigate(`/sellersproduct?unique_id=${unique_id}`);
    console.log("see", unique_id);
  };

  const dispatch = useDispatch();
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await dispatch(fetchProduct());
        setOrdersData(response);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching user orders:", error);
      }
    };

    fetchOrdersData();
  }, [dispatch]);

  console.log(ordersData, "console.log(data)");

  return (
    <div className="first-sellers-product-div">
      <div
        style={{
          marginTop: "7.5em",
        }}
      >
        <div className="third-sellers-product-div">
          <div className="flex-left-inside-third-sellers-product-div">
            <div
              onClick={() => navigate("/sellersproductsdisplay")}
              className="contents-flex-left-inside-third-sellers-product-div active-contents"
            >
              All Products
            </div>
            <div
              onClick={() => navigate("/publish")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Published
            </div>
            <div
              onClick={() => navigate("/drafts")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Drafts
            </div>
            {/* 
            <div
              onClick={() => navigate("/sellersorder")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              All Order
            </div>
            <div
              onClick={() => navigate("/shippedsellers")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Shipped Orders
            </div>
            <div
              onClick={() => navigate("/deliveredsellers")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Delivered Orders
            </div>
            <div
              onClick={() => navigate("/disputesellers")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Disputed Order
            </div>

            <div
              onClick={() => navigate("/paidsellers")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Paid Orders
            </div> */}
          </div>
          <div className="flex-right-inside-third-sellers-product-div">
            <div className="contents-flex-right-inside-third-sellers-product-div">
              <div className="gray-div-to-display-posts-balance">
                <div>
                  <h3>
                    {" "}
                    <span>&#8358;</span>0
                  </h3>
                  <p>Sold</p>
                </div>
                {/*  <div>
                <h3>0</h3>
                  <p>Follower</p>
                </div>*/}
                <div>
                  <h3>0</h3>
                  <p>Following</p>
                </div>
                <div>
                  <h3>
                    {" "}
                    0 {} {console.log(ordersData?.payload?.data?.rows.length)}
                  </h3>
                  <p>Posts</p>
                </div>
              </div>
              <div className="btn-div-to-display-posts-balance">
                <button
                  onClick={() => navigate("/addProducts")}
                  className="btn-btn-to-add-button"
                >
                  Add Product
                </button>
                <button className="btn-btn-to-add-button btn-profile">
                  {" "}
                  Wallet
                </button>
              </div>
            </div>
            <div className="div-display-functions">
              <div className="div-display-slider active-div-display-slider">
                All Products
              </div>
              <div
                onClick={() => navigate("/publish")}
                className="div-display-slider"
              >
                Published
              </div>
              <div
                onClick={() => navigate("/drafts")}
                className="div-display-slider"
              >
                Drafts
              </div>
              {/* <div
                onClick={() => navigate("/sellersorder")}
                className="div-display-slider"
              >
                All Orders
              </div>
              <div
                onClick={() => navigate("/shippedsellers")}
                className="div-display-slider"
              >
                Shipped Orders
              </div>
              <div
                onClick={() => navigate("/deliveredsellers")}
                className="div-display-slider"
              >
                Delivered Orders
              </div>
              <div
                onClick={() => navigate("/disputesellers")}
                className="div-display-slider"
              >
                Disputed Orders
              </div>
              {/* <div
                onClick={() => navigate("/shippedorder")}
                className="div-display-slider"
              >
                Shipped Orders
              </div> 
              <div 
                onClick={() => navigate("/paidsellers")}
                className="div-display-slider"
              >
                Paid Orders
              </div> */}{" "}
            </div>
            <div>
              <div>{loading ? <ShimmerLoader /> : <div></div>}</div>
              {ordersData.type === "products/fetchProduct/rejected" ? (
                <div
                  style={{
                    height: "70vh",
                    weight: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="no-product">
                      <p>You have no Products for Sale</p>
                      <br />
                      <img src={logo} alt="shopping" />
                      <br /> <br />
                      <button
                        style={{
                          width: "17em",
                          height: "3.8em",
                          borderRadius: "0.4em",
                          border: "none",
                          backgroundColor: "#386AEB",
                          color: "white",

                          fontSize: "1em",
                        }}
                        onClick={() => navigate("/addProducts")}
                      >
                        Start Selling
                      </button>
                      <br />
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="container-mapping">
                {ordersData &&
                  ordersData?.payload?.data?.rows?.map((product) => (
                    <div key={product.unique_id}>
                      <div key={product.unique_id}>
                        <img src={product?.product_images_data?.[0]?.image?.url} alt="sample" width="100%" />
                        <h3>{product.name}</h3>
                        {product.sales_price === product.price ? (
                          <p
                            style={{
                              display: "flex",
                              gap: "1em",
                            }}
                          >
                            <span>
                              {" "}
                              <span>&#8358;</span>
                              {product.price}
                            </span>{" "}
                          </p>
                        ) : (
                          <p
                            style={{
                              display: "flex",
                              gap: "1em",
                            }}
                          >
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "red",
                              }}
                            >
                              {" "}
                              <span>&#8358;</span>
                              {product.price}
                            </span>{" "}
                            <span>&#8358;{product.sales_price}</span>
                          </p>
                        )}
                        <div
                          style={{
                            margin: "0.8em 0",
                            fontSize: "0.85em",
                          }}
                        >
                          <p>In-Stock: {product.remaining}</p>
                        </div>

                        <div className="container-for-btns-sellers">
                          <button
                            className="btn-btn-div-publish"
                            onClick={() => handleClick(product.unique_id)}
                          >
                            View Product
                          </button>
                    
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
