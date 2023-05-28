import { addToCart } from "../../Slices/cartSlice";
import { useGetAllProductsQuery } from "../../Slices/productAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import Carousels from "../Navbar-and-Footer/Carousel";
import Navbar from '../Navbar-and-Footer/Navbar';
import Footer from '../Navbar-and-Footer/Footer';
import Loader from "../Loader/Loader";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  function handleClick(productID) {
    // Perform some action when the link is clicked, e.g. navigate to the product page
    navigate(`/products/${productID}`);
  }

  const { data, error, isLoading } = useGetAllProductsQuery();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>an error occurred...</p>
      ) : (
        <>
          <Navbar />
          <div style={{ marginTop: "2em" }}>
            <Carousels />
          </div>
          <div className="div-style-first">
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
          <Footer />
        </>
      )}
    </div>
  );
};

export default Product;
