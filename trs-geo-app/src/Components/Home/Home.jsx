import React from "react";
import "./Home.css";

const Home = (props) => {
  return (
  <div className="parent-container">
  <div className="over-container">
    <div className="left-container">
      <h3>TRS Employer API Search</h3>
      <p className="founder-text">
        This is an API database you can use to find employers in your area who pay into the teacher retirement system. 
        Please verify any and all information as it could be outdated and incorrect.
      </p>
    </div>
    <div className="right-container">
      <p>Additional content or images can go here</p>
    </div>
  </div>
  <div className="under-container">
    <a href="/products">See Employers</a>
  </div>
</div>
);
};
export default Home;
