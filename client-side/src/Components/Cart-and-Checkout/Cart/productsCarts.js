import { addToCart } from "../../../Slices/cartSlice";
import { useGetAllProductsQuery } from "../../../Slices/productApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductOld = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
    navigate("/test-cart");
  };

  function handleClick(productID) {
    navigate(`/oldcart/${productID}`);
  }

  const { data, error, isLoading } = useGetAllProductsQuery();

  return (
    <div>
      {isLoading ? (
        <p>an error loaidnf...</p>
      ) : error ? (
        <p>an error occurred...</p>
      ) : (
        <>
          <div style={{ marginTop: "2em" }}></div>
          <div
            style={{
              marginTop: "6em",
            }}
            className="div-style-first"
          >
            <h2>New Arrivals</h2>
            <div className="superior-div">
              {data?.map((product) => (
                <div className="div-to-map-products" key={product.id}>
                  <div className="image-container">
                    <img
                      onClick={() => handleClick(product.id)}
                      className="img-to-map-products"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: "0.2em",
                    }}
                    onClick={() => handleClick(product.id)}
                  >
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-title">{product.title}</p>
                    <h2 className="price-to-map">
                      <b>
                        <span className="product-span">NGN</span>
                      </b>
                      {product.price}
                      <span className="product-span">.00</span>
                    </h2>
                  </div>
                  <button
                    className="button-to-map-products"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductOld;
