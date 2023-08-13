import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./styles/product.css";
import sample from "../../Components/Products/images/Re.png";
import logo from "../Cart-and-Checkout/images/5购物渐变扁平矢量人物插画2420220903果冻_画板 1.png";
import ShimmerLoader from "../Loader/Shima";
import { fetchProduct } from "../../Slices/Sellers/SellersProductDetailsSlice";

const ProductListDrafts = () => {
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
  const filteredProducts =
    ordersData &&
    ordersData?.payload?.data?.rows?.filter((product) => product.status === 0);

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
              className="contents-flex-left-inside-third-sellers-product-div "
            >
              All Products
            </div>
            <div
              onClick={() => navigate("/publish")}
              className="contents-flex-left-inside-third-sellers-product-div "
            >
              Published
            </div>
            <div
              onClick={() => navigate("/drafts")}
              className="active-contents contents-flex-left-inside-third-sellers-product-div"
            >
              Drafts
            </div>
            {/* <div className="contents-flex-left-inside-third-sellers-product-div">
              Orders
            </div>
            <div className="contents-flex-left-inside-third-sellers-product-div">
              Processing
            </div>
            <div className="contents-flex-left-inside-third-sellers-product-div">
              Shipped
            </div>
            <div className="contents-flex-left-inside-third-sellers-product-div">
              Completed
            </div>
            <div className="contents-flex-left-inside-third-sellers-product-div">
              Refunds and Dispute
            </div>
            <div className="contents-flex-left-inside-third-sellers-product-div">
              Unpaid
            </div>
            <div className="contents-flex-left-inside-third-sellers-product-div">
              Paid
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
                  <h3>0</h3>
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
                <button 
                 onClick={() => navigate("/wallet")}className="btn-btn-to-add-button btn-profile">

                  {" "}
                 Wallet
                </button>
              </div>
            </div>
            <div className="div-display-functions">
              <div
                onClick={() => navigate("/sellersproductsdisplay")}
                className="div-display-slider"
              >
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
                className="div-display-slider  active-div-display-slider"
              >
                Drafts
              </div>
              {/* <div className="div-display-slider">Orders</div>
              <div className="div-display-slider">Processing</div>
              <div className="div-display-slider">Shipped</div>
              <div className="div-display-slider">Completed</div>
              <div className="div-display-slider">Refunds and Dispute</div>
              <div className="div-display-slider">Unpaid</div>
              <div className="div-display-slider">Paid</div> */}
            </div>
            <div>
              <div>
                {" "}
                <div>{loading ? <ShimmerLoader /> : <div></div>}</div>
                {filteredProducts && filteredProducts.length === 0 ? (
                  <div
                    style={{
                      weight: "100vw",
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "-24px",
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
                ) : null}{" "}
                <div className="container-mapping">
                  {filteredProducts?.map((product) => (
                    <div key={product.unique_id}>
                      <div>
                        <img src={sample} alt="sample" width="100%" />
                        <h3>{product.name}</h3>
                        <span>
                          {product.sales_price === product.price ? (
                            <p
                              style={{
                                display: "flex",
                                gap: "1em",
                              }}
                            >
                              <span>
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
                                <span>&#8358;</span>
                                {product.price}
                              </span>{" "}
                              <span>&#8358;{product.sales_price}</span>
                            </p>
                          )}
                        </span>

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
    </div>
  );
};

export default ProductListDrafts;
