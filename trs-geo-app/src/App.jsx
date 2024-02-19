import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App() {
  return (
      <BrowserRouter>
        <Router path="/" element={<Home />} />
        <Router path="/products" element={<Products />} />
      </BrowserRouter>
  );
}

export default App;