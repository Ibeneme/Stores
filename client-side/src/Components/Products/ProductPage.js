import React, { useState, useEffect } from "react";
import { addToCart } from "../../Slices/cartSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import './Details.css'
import Navbar from '../Navbar-and-Footer/Navbar'


const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
    navigate("/cart");
  };
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://hydra-store.onrender.com/products/${id}`);
      const data = await response.data.product;
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>No product</div>;
  } else {
    return (
      <div>
        <Navbar />
        <div

style={{
  marginTop: "9em",
}}
className="first-product-details-div"
key={product.id}
>
<div  className="div-to-map-products-details">
<img
         className="img-to-map-products-details"
            src={product.imageUrl}
            alt={product.name}
          />
</div>
<div className="content-details">
  
<h2>{product.name}</h2>
<br/>
<p>{product.description}</p>
<p>{product.price}</p>
<br/>  <br/>
<div className="div-btn-details">
<button 
className='button-to-map-productss '
onClick={() => handleAddToCart(product)}>Add to Cart</button>

</div>
</div>
</div>
      </div>
     
    );
  }
};

export default ProductPage;
