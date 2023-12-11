import React, { useEffect, useState } from "react";
import "./Cart.css";
import cookie from "cookie";
import axios from "axios";

function Cart() {
  const cookies = cookie.parse(document.cookie);
  const [cartItems, setCartItems] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);

  // const checkoutUrl = "https://stripe.com/";

  const fetchCart = () => {
    axios
      .get("https://sourcingmagic-backend.onrender.com/Cart", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setCartItems(res.data);
      });
  };

  const fetchDetails = () => {
    let data = [];
    for (let item of cartItems) {
      axios
        .get(
          `https://sourcingmagic-backend.onrender.com/Products/${item.product_id}`
        )
        .then((response) => {
          console.log(response.data);
          data = [...data, response.data];
          setItemDetails(data);
        })
        .catch((error) => {
          console.error("error fetching product details", error);
        });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      fetchDetails();
    }
  }, [cartItems]);      

  const cartTotal = () => {
    return itemDetails.reduce((total, item) => total + item.price)
  };

  const handleDelete = (product_id) => {
    axios.delete(`https://sourcingmagic-backend.onrender.com/Cart/${product_id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then((res) => {setCartItems(cartItems.filter((item) => item.product_id !== product_id));
      });
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {itemDetails.map((item) => (
        <div className="cart-item" key={item.product_id}>
          <div className="cart-details">
            <div className="cart-delete">
              <img src={item?.image_url} alt={item?.product_title} />
              <button
                className="button"
                onClick={() => handleDelete(item?.product_id)}
              >
                Delete
              </button>
            </div>
            <p>{item?.product_title}</p>
          </div>
          <p>${item?.price.toFixed(2)}</p>
        </div>
      ))}
      <h4>Total ${cartTotal()}</h4>
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="checkout-button">
        Checkout
      </a>
    </div>
  );
}

export default Cart;
