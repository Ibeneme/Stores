import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {
  fetchOrderDetails,
  markOrderAsCompleted,
  markOrderAsShipped,
  markOrderAsShippedMain,
} from "../../../Slices/orders/SellersOrders/OrdersSellersSlice";
import "../styles/product.css";
import ShimmerLoader from "../../Loader/Shima";
// import { MdEdit } from "react-icons/md";
// import { markAsCancel } from "../../../Slices/orders/OrderSlice";

const ViewSellers = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unique_id = queryParams.get("unique_id");
  const orders = useSelector((state) => state.ordersInternal);
  const { loading } = useSelector((state) => state.ordersInternal);
  console.log(loading, "loadingd");
  const [loadingg, setLoading] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenShipped, setModalOpenShipped] = useState(false);
  const [isModalOpenCompleted, setModalOpenCompleted] = useState(false);
  const [orderUniqueId, setOrderUniqueId] = useState(null);

  const handleOpenModal = (order_unique_id) => {
    setOrderUniqueId(order_unique_id);
    setModalOpen(true);
  };

  const handleOpenModalShipped = (order_unique_id) => {
    setOrderUniqueId(order_unique_id);
    setModalOpenShipped(true);
  };

  const handleOpenModalCompleted = (order_unique_id) => {
    setOrderUniqueId(order_unique_id);
    setModalOpenCompleted(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseModalShipped = () => {
    setModalOpenShipped(false);
  };

  const handleCloseModalCompleted = () => {
    setModalOpenCompleted(false);
  };

  const handleConfirm = async () => {
    if (orderUniqueId) {
      try {
        const response = await dispatch(
          markOrderAsShipped({ order_unique_id: orderUniqueId })
        );
        console.log(response, "responseShipped");
        window.location.reload();
      } catch (error) {
        alert(error); // Handle the error by displaying it to the user
      }
    }
    setModalOpen(false);
  };

  const handleConfirmShipped = async () => {
    if (orderUniqueId) {
      try {
        const response = await dispatch(
          markOrderAsShippedMain({ order_unique_id: orderUniqueId })
        );
        console.log(response, "responseShipped");
        window.location.reload();
      } catch (error) {
        alert(error); // Handle the error by displaying it to the user
      }
    }
    //window.location.reload();
    setModalOpenShipped(false);
  };

  const [completeErr, setCompleteErr] = useState("");
  const handleConfirmComplete = () => {
    if (orderUniqueId) {
      dispatch(markOrderAsCompleted({ order_unique_id: orderUniqueId }))
        .then((response) => {
          console.log("handleMarkOrderAsShipped:", response?.error?.message);
          setCompleteErr(response?.error?.message);
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
          console.log("ErrorhandleMarkOrderAsShipped:", error);
        });
    }
    setModalOpenCompleted(false);
  };
  useEffect(() => {
    setLoading(true);
    dispatch(fetchOrderDetails(unique_id));

    setLoading(false);
  }, [dispatch, unique_id]);
  console.log(orders, "ss");

  const order = orders?.ordersInternalData?.data;
  console.log(order, "ggg");
  if (loadingg) {
    return (
      <div>
        <ShimmerLoader />
      </div>
    );
  }

  // const handleMarkOrderAsShipped = (order_unique_id) => {
  //   dispatch(markOrderAsShipped({ order_unique_id }))
  //     .then((response) => {
  //       window.location.reload();
  //       console.log("handleMarkOrderAsShipped:", response);
  //     })
  //     .catch((error) => {
  //       console.log("ErrorhandleMarkOrderAsShipped:", error);
  //     });
  // };

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
                  alt="track"
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
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "16px",
              gap: "6px",
            }}
          >
            {/* <button
              className="button-orders"
              style={{
                backgroundColor: "#66666696",
                color: "white",
              }}
              onClick={() => handleClick(order?.unique_id)}
            >
              {" "}
              Edit Order <MdEdit />
            </button> */}
          </div>
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
              marginBottom: "32px",
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
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                borderTop: "1px solid #66666635",
                padding: "46px 0",
              }}
            >
              <h4>Buyers Details</h4>
              <p>
                Name: {""} {order?.buyer_user_data?.firstname}{" "}
                {order?.buyer_user_data?.lastname}
              </p>
              <p>
                Email: {""} {order?.buyer_user_data?.email}
              </p>
              <p>
                Address: {""} {order?.buyer_user_data?.address}
              </p>
            </div>
          </div>

          {order?.delivery_status === "Paid" ? (
            <button
              className="button-orders"
              style={{
                color: "#fff",
                backgroundColor: "#128807",
                marginBottom: 48,
              }}
              onClick={() => handleOpenModal(order?.order_unique_id)}
            >
              Transit this Order
            </button>
          ) : null}

          {order?.delivery_status === "Shipping" ? (
            <button
              className="button-orders"
              style={{
                color: "#fff",
                backgroundColor: "#386AEB",
                marginBottom: 48,
              }}
              onClick={() => handleOpenModalShipped(order?.order_unique_id)}
            >
              Ship this Order
            </button>
          ) : null}

          {order?.delivery_status === "Received" ? (
            <div>
              <button
                className="button-orders"
                style={{
                  color: "#fff",
                  backgroundColor: "#386AEB",
                  marginBottom: 48,
                }}
                onClick={() => handleOpenModalCompleted(order?.order_unique_id)}
              >
                Complete this Order
              </button>

              {completeErr ? (
                <p
                  style={{
                    color: "red",
                    marginTop: -38,
                    marginBottom: 48,
                  }}
                >
                  {completeErr} Cannot Completer this order
                </p>
              ) : null}
            </div>
          ) : null}

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Action</h2>
                <p>Are you sure you want to transit this order?</p>
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
                      backgroundColor: "#128807",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                    onClick={handleConfirm}
                  >
                    Yes
                  </button>

                  <button
                    className="button-orders"
                    style={{
                      color: "#128807",
                      backgroundColor: "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      border: "1px solid #128807",
                    }}
                    onClick={handleCloseModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {isModalOpenShipped && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Action</h2>
                <p>Are you sure you want to Ship this order?</p>
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
                    onClick={handleConfirmShipped}
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
                    onClick={handleCloseModalShipped}
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <h4>More Details</h4>
            <div>
              <p
                style={{
                  marginBottom: "8px",
                }}
              >
                Service Charge: {""} <span>&#8358;</span>
                {order?.service_charge}
              </p>
              <p
                style={{
                  marginBottom: "8px",
                }}
              >
                Shipping Fee: {""} <span>&#8358;</span>
                {order?.shipping_fee}
              </p>
              <p
                style={{
                  marginBottom: "8px",
                }}
              >
                Credit: {""} <span>&#8358;</span>
                {order?.credit}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSellers;
