import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";
import cookie from 'cookie';
import { Link } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState ([]);
  const cookies = cookie.parse(document.cookie);

  const fetchProducts = () => {
    axios.get("https://sourcingmagic-backend.onrender.com/Products")
    .then((response) => {
      setProducts(response.data);
    })
  .catch((error) => {
    console.log(error);
  });
  };

  const handleAddToCart = (product_id) => {
      axios.post("https://sourcingmagic-backend.onrender.com/addCart" ,  {"productId": product_id},{
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }).then(() => {
        alert("Added to Cart");
      }).catch((error) => {
        console.log(err.message)
      });
   };




    
    useEffect(()=>{
        fetchProducts();
    }, []);
  return (
      <div className="card-container">
        {
            products.map((product)=>(
                //create card here maybe using MUI
                <div key={product.product_id} >
                    <h5>
                      <Link to={`/products/${product.product_id}`}>                      
                      {product.product_title}
                      </Link>
                      </h5>
                    <div className="add-button">
                    <img src={product.image_url} alt={product.product_title} className="product-image"/>
                    <button onClick={()=> handleAddToCart(product.product_id)}>Add to Cart</button>
                    </div>
                </div>
            ))
        }          
      </div>
  )

  
}

export default Products