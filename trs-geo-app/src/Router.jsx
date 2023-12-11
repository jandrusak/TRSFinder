import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import cookie from "cookie";
import Home from "./Components/Home/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Users from "./Components/Users";
import axios from "axios";
import Cart from "./Components/Cart/Cart"
import Navigation from './Components/Navigation'
import ProductDetails from "./Components/Products/ProductDetails";
import Products from "./Components/Products/Products";



// Write checkAuth function here
// Check the cookies for a cookie called "loggedIn"
const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  return cookies.loggedIn === "true";
};

// Write ProtectedRoute function here
// const ProtectedRoute = ({ path, element }) => {
//     if (checkAuth()) {
//         return <Route path ={path} element={element}/>
//     } else {
//         return <Navigate to="/login" />
//     }
// }

const ProtectedRoute = (props) => {
  const { component: Component, ...rest } = props;

  return checkAuth() === true ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

const Router = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false) 
  
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    if (cookies.loggedIn ==='true'){
      setUserLoggedIn(true)
    } else {
      setUserLoggedIn(false)
    }

  }, [userLoggedIn, setUserLoggedIn])

  console.log(userLoggedIn)
  return (
    <>
    <Navigation userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* add products page protected route */}
      <Route path="/products" element={<ProtectedRoute component={Products} />} />
      <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
      <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn}/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
      <Route path="/products/:productId" element={<ProductDetails />} />
    </Routes>
    </>
  );
};

export default Router;
