import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';


function ProductDetails(props) {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    useEffect(() => {        
        axios.get(`https://trsfinder-backend.onrender.com/Products/${productId}`)
        .then(response => {
            setProduct(response.data);
        })
        .catch(error => {
            console.error("error fetch details:", error);
        });
    }, [productId]);

    if (!product) return <div>Loading...</div>;

  return (
        <div className='product-details-container'>
        <h2>{product.product_title}</h2>
        <img src={product.image_url} alt= {product.product_title}/>
        <p>Description: {product.description}</p>
        </div>
      );
}

export default ProductDetails