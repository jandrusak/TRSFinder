import React from "react";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="parent-container">
      <div className="over-container">
        <div className="left-container">
          <h3>TRS Employer API Search</h3>
          <p className="founder-text">This is an api database you can use to find employers that are in your city who pay into the teacher retirement system. Please verify any and all information as it could be outdated and incorrect. I do request that you make an account for quality purposes.</p>
        </div>
        <div className="logo-container">
        </div>
        <div className="right-container">
        </div>
      </div>
      <div className="under-container">
          <a href="/products">See Employers</a>
      </div>
    </div>
  );
};

export default Home;
