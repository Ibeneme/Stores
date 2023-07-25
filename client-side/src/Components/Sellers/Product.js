import { useNavigate } from "react-router";
import { useGetAllProductsQuery } from "../../Slices/Sellers/productSlice";
import Loader from "../Loader/Loader";
import "./styles/product.css";
import sample from "../../Components/Products/images/Re.png";

const ProductList = () => {
  const navigate = useNavigate();
  const handleClick = (unique_id) => {
    navigate(`/sellersproduct?unique_id=${unique_id}`);
    console.log("see", unique_id);
  };
  const { data, isLoading, isError, error } = useGetAllProductsQuery();
  
  
  console.log(data);
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return <div>No products available</div>;
  }

  const { rows } = data.data;

  if (!rows || rows.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="first-sellers-product-div">

      <div
        style={{
          marginTop: "7.5em",
        }}
      >
        <div className="third-sellers-product-div">
          <div className="flex-left-inside-third-sellers-product-div">
            <div className="contents-flex-left-inside-third-sellers-product-div active-contents">
              All Products
            </div>
            <div
              onClick={() => navigate("/publish")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Published Products
            </div>
            <div
              onClick={() => navigate("/drafts")}
              className="contents-flex-left-inside-third-sellers-product-div"
            >
              Drafts
            </div>
            <div className="contents-flex-left-inside-third-sellers-product-div">
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
            </div>
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
                    0 {} {console.log(rows.length)}
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
                  Edit Profile
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
                Published Products
              </div>
              <div
                onClick={() => navigate("/drafts")}
                className="div-display-slider"
              >
                Drafts
              </div>
              <div className="div-display-slider">Orders</div>
              <div className="div-display-slider">Processing</div>
              <div className="div-display-slider">Shipped</div>
              <div className="div-display-slider">Completed</div>
              <div className="div-display-slider">Refunds and Dispute</div>
              <div className="div-display-slider">Unpaid</div>
              <div className="div-display-slider">Paid</div>
            </div>
            <div>
              <div className="container-mapping">
                {rows.map((product) => (
                  <div key={product.unique_id}>
                    <div key={product.unique_id}>
                      <img src={sample} alt='sample' width="100%" />
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
                        {/* {product.status === 1 ? (
                        <button className="btn-btn-sellers" > View this Product</button>
                      ) : (
                        <button className="btn-btn-sellers">
                          Publish Product
                        </button>
                      )} */}
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
