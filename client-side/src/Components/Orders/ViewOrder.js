import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {
  fetchUserOrderByUniqueId,
  markAsCancel,
  markAsDisputes,
  markAsReceived,
} from "../../Slices/orders/OrderSlice";
// import { MdEdit } from "react-icons/md";
// import { FaCreditCard } from "react-icons/fa";
import "../../Components/Sellers/styles/product.css";
import { BsTrash } from "react-icons/bs";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unique_id = queryParams.get("unique_id");
  const orders = useSelector((state) => state.users); // Replace "order" with the correct slice name in your Redux store
  //const navigate = useNavigate();
  // const handleClick = (unique_id) => {
  //   navigate(`/vieworder?unique_id=${unique_id}`);
  // };
  useEffect(() => {
    dispatch(fetchUserOrderByUniqueId(unique_id));
  }, [dispatch, unique_id]);
  console.log(orders?.orders?.data, "ss");

  const order = orders?.orders?.data;
  console.log(order, "ggg");

  const [isModalOpenCompleted, setModalOpenCompleted] = useState(false);
  const [orderUniqueId, setOrderUniqueId] = useState(null);
  const [isModalOpenCancel, setModalOpenCancel] = useState(false);
  const [isModalOpenDispute, setModalOpenDispute] = useState(false);

  const handleOpenModalCompleted = (order_unique_id) => {
    setOrderUniqueId(order_unique_id);
    setModalOpenCompleted(true);
  };

  const handleOpenModalCancel = (order_unique_id) => {
    setOrderUniqueId(order_unique_id);
    setModalOpenCancel(true);
  };

  const handleOpenModalDispute = (order_unique_id) => {
    setOrderUniqueId(order_unique_id);
    setModalOpenDispute(true);
  };

  const handleCloseModalDispute = () => {
    setModalOpenDispute(false);
  };
  const handleCloseModalCancel = () => {
    setModalOpenCancel(false);
  };

  const handleCloseModalCompleted = () => {
    setModalOpenCompleted(false);
  };

  const [completeErr, setCompleteErr] = useState("");
  const handleConfirmComplete = () => {
    if (orderUniqueId) {
      dispatch(markAsReceived({ order_unique_id: orderUniqueId }))
        .then((response) => {
          window.location.reload();
          console.log("handleMarkOrderAsShipped:", response);
          setCompleteErr(response?.error?.message);
        })
        .catch((error) => {
          console.log("ErrorhandleMarkOrderAsShipped:", error);
        });
    }
    setModalOpenCompleted(false);
  };
  const handleConfirmCancel = () => {
    if (orderUniqueId) {
      dispatch(markAsCancel({ order_unique_id: orderUniqueId }));
    }
    window.location.reload();
    setModalOpenCancel(false);
  };

  const handleConfirmDispute = async () => {
    try {
      if (orderUniqueId) {
        const response = await dispatch(
          markAsDisputes({ order_unique_id: orderUniqueId })
        );
        console.log(response, "responseDispute");
      }
    } catch (error) {
      console.error(error, "errorDispute");
    } finally {
      window.location.reload();
      setModalOpenDispute(false);
    }
  };

  return (
    <div style={{ padding: "8em 0", backgroundColor: "white" }}>
      <div
        key={order?.unique_id}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        className="vieworder"
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "900",
              marginBottom: "24px",
            }}
          >
            {/* <BsArrowLeft 
            onClick={()=>navigate('/orderr')}/> */}{" "}
            <p>Order Details</p>
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "#666666",
            }}
          >
            Tracking Number: {order?.tracking_number}
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "#666666",
              marginBottom: "12px",
            }}
          >
            Placed Order On {order?.updatedAt?.fulldate}
          </p>
          <span
            style={{
              fontSize: "15px",
              color: "#666666",
              paddingBottom: "32px",
            }}
          >
            {order?.paid === false ? (
              <p
                style={{
                  backgroundColor: "#ff000021",
                  color: "#ff0000",
                  padding: "12px 16px",
                }}
              >
                Payment was Cancelled and Unsuccessful
              </p>
            ) : (
              <p
                style={{
                  backgroundColor: "#0ff00021",
                  color: "green",
                  padding: "12px 16px",
                }}
              >
                Payment Successful
              </p>
            )}
          </span>

          <span
            style={{
              fontSize: "15px",
              color: "#666666",
              paddingBottom: "32px",
              marginTop: 24,
            }}
          >
            {order?.delivery_status === "Refund" ? (
              <p
                style={{
                  backgroundColor: "#0665F221",
                  color: "#0665F2",
                  padding: "12px 16px",
                  marginTop: 12,
                }}
              >
                Your delivery Refund is processing
              </p>
            ) : (
              <p
                style={{
                  backgroundColor: "#0665F221",
                  color: "#0665F2",
                  padding: "12px 16px",
                  marginTop: 12,
                }}
              >
                Delivery Status: {order?.delivery_status}
              </p>
            )}
          </span>
        </div>

        <div
          style={{
            borderTop: "1px solid #66666645",
            padding: "12px 0",
            margin: "12px 0",
            borderBottom: "1px solid #66666645",
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
                  src={order?.product_images_data?.[0].image?.url}
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
                {order?.amount}
              </p>

              <BsTrash />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "16px",
              gap: "6px",
            }}
          ></div>
        </div>
        <div
          style={{
            marginTop: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h4>Payment Details</h4>
            <div>
              <p
                style={{
                  marginBottom: "8px",
                }}
              >
                Payment Method: {""}
                {order?.payment_method}
              </p>
              {/* <button
                className="button-orders"
                style={{
                  color: "#666666",
                  backgroundColor: "#66666625",
                }}
              >
                {" "}
                Change Payment Method <MdEdit />
              </button> */}
            </div>
          </div>

          {isModalOpenCancel && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Action</h2>
                <p>Are you sure you want to Cancel this order?</p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    gap: 16,
                  }}
                >
                  <button
                    className="button-orders"
                    style={{
                      color: "#fff",
                      backgroundColor: "#ff0000",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                    onClick={handleConfirmCancel}
                  >
                    Yes
                  </button>

                  <button
                    className="button-orders"
                    style={{
                      color: "#ff0000",
                      backgroundColor: "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      border: "1px solid #ff0000",
                    }}
                    onClick={handleCloseModalCancel}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {isModalOpenCompleted && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Action</h2>
                <p>Are you sure you want to Complete this order?</p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    gap: 16,
                  }}
                >
                  <button
                    className="button-orders"
                    style={{
                      color: "#fff",
                      backgroundColor: "#386AEB",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                    onClick={handleConfirmComplete}
                  >
                    Yes
                  </button>

                  <button
                    className="button-orders"
                    style={{
                      color: "#386AEB",
                      backgroundColor: "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      border: "1px solid #386AEB",
                    }}
                    onClick={handleCloseModalCompleted}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {isModalOpenDispute && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Action</h2>
                <p>Are you sure you want to Dispute this order?</p>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    gap: 16,
                  }}
                >
                  <button
                    className="button-orders"
                    style={{
                      color: "#fff",
                      backgroundColor: "#386AEB",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                    onClick={handleConfirmDispute}
                  >
                    Yes, Dispute
                  </button>

                  <button
                    className="button-orders"
                    style={{
                      color: "#386AEB",
                      backgroundColor: "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      border: "1px solid #386AEB",
                    }}
                    onClick={handleCloseModalDispute}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <div
              style={{
                margin: "46px 0",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                borderTop: "1px solid #66666635",
                paddingTop: "46px",
              }}
            >
              <h4>Delivery Details</h4>
              <p>
                Delivery Address: {""}
                {order?.to_address}
              </p>
              <p>
                Delivery Status: {""}
                {order?.delivery_status}
                {order?.delivery_status === "Processing" ? (
                  <div>
                    <button
                      className="button-orders"
                      style={{
                        color: "#fff",
                        backgroundColor: "#ff0000",
                        marginTop: 48,
                      }}
                      onClick={() =>
                        handleOpenModalCancel(order?.order_unique_id)
                      }
                    >
                      Cancel this Order
                    </button>

                    {completeErr ? (
                      <p
                        style={{
                          color: "red",
                          marginTop: -38,
                          marginBottom: 48,
                        }}
                      ></p>
                    ) : null}
                  </div>
                ) : null}
              </p>
              {order?.delivery_status === "Completed" ? (
                <div>
                  <button
                    className="button-orders"
                    style={{
                      color: "#fff",
                      backgroundColor: "#386AEB",
                      marginTop: 48,
                    }}
                    onClick={() =>
                      handleOpenModalDispute(order?.order_unique_id)
                    }
                  >
                    Dispute this Order
                  </button>

                  {completeErr ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: -38,
                        marginBottom: 48,
                      }}
                    ></p>
                  ) : null}
                </div>
              ) : null}
              {order?.delivery_status === "Shipped" ? (
                <div>
                  <button
                    className="button-orders"
                    style={{
                      color: "#fff",
                      backgroundColor: "#386AEB",
                      marginTop: 48,
                    }}
                    onClick={() =>
                      handleOpenModalCompleted(order?.order_unique_id)
                    }
                  >
                    Complete this Order
                  </button>

                  {completeErr ? (
                    <p
                      style={{
                        color: "red",

                        marginBottom: 48,
                      }}
                    >
                      {completeErr} Cannot Completer this order
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                borderTop: "1px solid #66666635",
                padding: "46px 0",
              }}
            >
              <h4>Sellers Details</h4>
              <p>
                Name: {""} {order?.seller_user_data?.firstname}{" "}
                {order?.seller_user_data?.lastname}
              </p>
              <p>
                Email: {""} {order?.seller_user_data?.email}
              </p>
              <p>
                Location {""} {order?.product_data?.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
