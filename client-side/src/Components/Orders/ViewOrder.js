import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchUserOrderByUniqueId } from "../../Slices/orders/OrderSlice";
import { MdEdit } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import "../../Components/Sellers/styles/product.css";
import { BsTrash } from "react-icons/bs";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unique_id = queryParams.get("unique_id");
  const orders = useSelector((state) => state.users); // Replace "order" with the correct slice name in your Redux store
  const navigate = useNavigate();
  const handleClick = (unique_id) => {
    navigate(`/vieworder?unique_id=${unique_id}`);
  };
  useEffect(() => {
    dispatch(fetchUserOrderByUniqueId(unique_id));
  }, [dispatch, unique_id]);
  console.log(orders?.orders?.data, "ss");

  const order = orders?.orders?.data;
  console.log(order, "ggg");

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
                 alt='orders'
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
          >
            {order?.paid === false ? (
              <button
                className="button-orders"
                style={{
                  backgroundColor: "#37AD3C",
                  color: "white",
                }}
                onClick={()=> navigate("/pay")}
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
            )}
            <button
              className="button-orders"
              style={{
                backgroundColor: "#66666696",
                color: "white",
              }}
              onClick={() => handleClick(order?.unique_id)}
            >
              {" "}
              Edit Order <MdEdit />
            </button>
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
              <button
                className="button-orders"
                style={{
                  color: "#666666",
                  backgroundColor: "#66666625",
                }}
              >
                {" "}
                Change Payment Method <MdEdit />
              </button>
            </div>
          </div>

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
              </p>
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
