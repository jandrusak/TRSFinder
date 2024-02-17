import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import MenuAppBar from './Components/Navigation'

const Router = () => {
  return (
    <>
    <MenuAppBar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </Routes>
    </>
  );
};

export default Router;
