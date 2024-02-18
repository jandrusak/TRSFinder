import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products based on the search query
  // const fetchProducts = async () => {
  //   if (search.trim()) {
  //         const query = `?search=${encodeURIComponent(search)}`;
  //         try {
  //                   // axios.get("https://trsfinder-backend.onrender.com/Products")
  //           const response = await axios.get(`http://localhost:4001/Products${query}`);
  //           setProducts(response.data);
  //         } catch (error) {
  //                 console.error('Error fetching products:', error);
  //             }
  //     }
  //   }

  const fetchProducts = async () => {
    const query = search.trim() ? `?search=${encodeURIComponent(search)}` : "";
    const url = `https://trsfinder-backend.onrender.com/Products${query}`;
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

  // Add this button onClick
  const handleSearchClick = () => {
    fetchProducts();
  };

  const handleProductClick = (product) => {
    // setSelectedProduct(product);
  };

  const formatWebsiteAddress = (url) => {
    if (!url) return ""; // Return empty string if URL is falsy
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url; // Return URL if it already has a protocol
    } else {
      return `http://${url}`; // Add http:// to the URL if it lacks a protocol
    }
  };
  //this useEffect shows results as typing
  //   useEffect(() => {
  //     fetchProducts();
  // }, [search]);
  useEffect(() => {
    console.log("Selected product updated:", selectedProduct);
    window.scrollTo(0, 0);
  }, [selectedProduct]);
  {
    products.map((product) => (
      <div
        key={product.school_id}
        className="product-item"
        onClick={() => handleProductClick(product)}
      >
        <h5>{product.name}</h5>
      </div>
    ));
  }

  return (
    <div className="products-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by City, County, Zip, or District Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearchClick}>Search</button>{" "}
        {/* Updated to call fetchProducts directly */}
      </div>
      {/* <div className="product-list"> */}
      <div className="content">
        {products.length > 0 && (
          <div className="employer-list">
            {products.map((product) => (
              <div
                key={product.school_id}
                className="product-item"
                onClick={() => setSelectedProduct(product)}
              >
                <h5>{product.name}</h5>
              </div>
            ))}
          </div>
        )}
        {selectedProduct && (
          <div className="product-details" style={{ display: "block" }}>
            <h2>{selectedProduct.name}</h2>
            <p>Address: {selectedProduct.address}</p>
            <p>City: {selectedProduct.city}</p>
            <p>Type: {selectedProduct.type}</p>
            <p>
              Website:{" "}
              <a
                href={formatWebsiteAddress(selectedProduct.website_address)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedProduct.website_address}
              </a>
            </p>
            <p>Phone: {selectedProduct.phone}</p>
            <p>Zip: {selectedProduct.zip}</p>
            <p>County: {selectedProduct.county}</p>
            <p>District Name: {selectedProduct.district_name}</p>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
