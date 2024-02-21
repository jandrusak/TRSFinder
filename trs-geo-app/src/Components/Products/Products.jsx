import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);



  const fetchProducts = async () => {
    const query = search.trim() ? `?search=${encodeURIComponent(search)}` : "";
    const url = `https://trsfinder-backend.onrender.com/Products${query}`;
    // const url = `http://localhost:4001/Products${query}`;

    console.log("Requesting URL:", url);
    try {
      const response = await axios.get(
        // `http://localhost:4001/Products${query}`
        `https://trsfinder-backend.onrender.com/Products${query}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error Data:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
      }
      console.error("Error Config:", error.config);
    }
  };

  const toggleDetails = (productId) => {
    setSelectedProductId(selectedProductId === productId ? null : productId);
  };


  const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      return `https://${url}`;
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="products-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by Name, City, County, Zip, or District Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchProducts}>Search</button>
      </div>
      <div className="employer-list">
        {products.map((product) => (
          <React.Fragment key={product.school_id}>
            <div className="product-item" onClick={() => toggleDetails(product.school_id)}>
              <h5>{product.name}</h5>
            </div>
            {selectedProductId === product.school_id && (
              <div className="product-details">
                <p>Address: {product.address}</p>
                <p>City: {product.city}</p>
                <p>Type: {product.type}</p>
                <p>Website: <a href={formatUrl(product.website_address)} target="_blank" rel="noopener noreferrer">{product.website_address}</a></p>
                <p>Phone: {product.phone}</p>
                <p>Zip: {product.zip}</p>
                <p>County: {product.county}</p>
                <p>District Name: {product.district_name}</p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Products;