import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
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
        const query = search.trim() ? `?search=${encodeURIComponent(search)}` : '';
        try {
          const response = await axios.get(`http://localhost:4001/Products${query}`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      
      // Add this button onClick
      const handleSearchClick = () => {
        fetchProducts();
      };
      


      const handleProductClick = (product) => {

        // setSelectedProduct(product);
        

    };

//this useEffect shows results as typing
    //   useEffect(() => {
    //     fetchProducts();
    // }, [search]);
    useEffect(() => {
        console.log("Selected product updated:", selectedProduct);
    }, [selectedProduct]);
    {products.map((product) => (
        <div key={product.school_id} className="product-item" onClick={() => handleProductClick(product)}>
            <h5>{product.name}</h5>
        </div>
    ))}
    




    return (
        <div className="products-container">
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search by City, County, Zip, or District Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
        <button onClick={handleSearchClick}>Search</button> {/* Updated to call fetchProducts directly */}
            </div>
            {/* <div className="product-list"> */}
            <div className="content">
            <div className="employer-list">
        {products.map((product) => (
          <div key={product.school_id} className="product-item" onClick={() => setSelectedProduct(product)}>
            <h5>{product.name}</h5>
          </div>
                ))}
            </div>
            {selectedProduct && (
                <div className="product-details">
                <h2>{selectedProduct.name}</h2>
            <p>Address: {selectedProduct.address}</p>
             <p>City: {selectedProduct.city}</p>
             <p>Type: {selectedProduct.type}</p>
             <p>Website: <a href={selectedProduct.website_address} target="_blank" rel="noopener noreferrer">{selectedProduct.website_address}</a></p>
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
