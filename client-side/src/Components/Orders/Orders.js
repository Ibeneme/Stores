import { useNavigate } from "react-router";
import { fetchUserOrders } from "../../Slices/orders/OrderSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import ShimmerLoader from "../Loader/Shima";
import ill from "./image/No data found.png";
import { deleteUserOrder } from "../../Slices/orders/OrderSlice";

const Order = () => {
  const navigate = useNavigate();
  const handleClick = (unique_id) => {
    navigate(`/vieworder?unique_id=${unique_id}`);
  };

  const [ordersData, setOrdersData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClickCancel = (unique_id) => {
    console.log(unique_id);
    dispatch(deleteUserOrder({ unique_id }));
    window.location.reload();
  };

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await dispatch(fetchUserOrders());
        setOrdersData(response);
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
          marginTop: "4.5em",
        }}
      >
        <div className="third-sellers-product-div">
          <div className="flex-left-inside-third-sellers-product-div">
            <div className="contents-flex-left-inside-third-sellers-product-div active-contents">
              All Orders
            </div>
            <div
              onClick={() => navigate("/processingorder")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              In Transit
            </div>
            <div
              onClick={() => navigate("/deliveredorder")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Shipped
            </div>

            <div
              onClick={() => navigate("/paidorder")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Paid
            </div>

            <div
              onClick={() => navigate("/disputesorder")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Disputed Order
            </div>

            {/* <div
              onClick={() => navigate("/shippedorder")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Shipped 
            </div> */}
          </div>
          <div className="flex-right-inside-third-sellers-product-div">
            <div className="div-display-functions">
              <div
                onClick={() => navigate("/orderr")}
                className="div-display-slider active-div-display-slider"
              >
                All
              </div>
              <div
                onClick={() => navigate("/processingorder")}
                className="div-display-slider"
              >
                In Transit
              </div>
              <div
                onClick={() => navigate("/deliveredorder")}
                className="div-display-slider"
              >
                Shipped
              </div>
              <div
                onClick={() => navigate("/paidorder")}
                className="div-display-slider"
              >
                Paid
              </div>

              <div
                onClick={() => navigate("/disputesorder")}
                className="div-display-slider"
              >
                Disputed
              </div>
              {/* <div
                onClick={() => navigate("/shippedorder")}
                className="div-display-slider"
              >
                Shipped 
              </div> */}
            </div>
            <div>
              <div>{loading ? <ShimmerLoader /> : <div></div>}</div>
              {ordersData.type === "user/fetchUserOrders/rejected" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "48px",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                    }}
                  >
                    You have no Orders
                  </p>
                  <img width="300px" src={ill} alt="not" />
                  <button
                    style={{
                      padding: "12px 32px",
                      backgroundColor: "#386AEB",
                      color: "white",
                      border: "none",
                      height: "55px",
                      borderRadius: "6px",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : null}

              {ordersData &&
                ordersData?.payload?.data?.rows.map((order) => (
                  <div
                    key={order.unique_id}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: "12px",
                      borderBottom: "1px solid #00000025",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "70px",
                            height: "70px",
                          }}
                        >
                          <img
                            alt="orders"
                            width="100%"
                            height="100%"
                            style={{
                              borderRadius: "8px",
                            }}
                            src={order?.product_images_data?.[0]?.image?.url}
                          />
                        </div>
                        <div>
                          <h3
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            {order?.product_data?.name}
                          </h3>
                          <p
                            style={{
                              fontSize: "12px",
                              margin: "2px 0",
                            }}
                          >
                            {order?.product_data?.location}
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "900",
                              color: "gray",
                              marginTop: "12px",
                            }}
                          >
                            {" "}
                            Qty: {order?.product_data?.quantity}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: "900",
                          }}
                        >
                          {" "}
                          <span>&#8358;</span>
                          {order.amount}
                        </p>

                        <BsTrash
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={handleOpen}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "16px",
                        gap: "6px",
                      }}
                    >
                      {/* {order.paid === false ? (
                        <button
                          className="button-orders"
                          style={{
                            backgroundColor: "#37AD3C",
                            color: "white",
                          }}
                          onClick={() => navigate("/pay")}
                        >
                          {" "}
                          Pay Now <FaCreditCard />
                        </button>
                      ) : (
                        <button
                          className="button-orders"
                          style={{
                            backgroundColor: "#37AD3C",
                            color: "white",
                          }}
                        >
                          {" "}
                          Buy Again <FaCreditCard />{" "}
                        </button>
                      )} */}
                      <button
                        className="button-orders"
                        style={{
                          backgroundColor: "#064bde",
                          color: "white",
                        }}
                        onClick={() => handleClick(order.unique_id)}
                      >
                        {" "}
                        View Order <MdEdit />
                      </button>
                    </div>
                    {isModalOpen && (
                      <div className="modal">
                        <div className="modal-content">
                          <h2>Confirm Delete</h2>
                          <p>Are you sure you want to delete this item?</p>
                          <div className="modal-actions">
                            <button
                              className="modal-other"
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                            <button
                              className=" modal-red"
                              onClick={() => {
                                handleClickCancel(order?.unique_id);
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              <div
                style={{
                  marginBottom: "23em",
                }}
              ></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
