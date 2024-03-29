import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import backgroundImage from '../../images/newback.jpg';

const Home = (props) => {
  const parentContainerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    // backgroundPosition: 'center top -330px',
    backgroundPosition: 'center 44%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    padding: '20px',
    color: '#fff', // Assuming a dark background, text is set to white for better visibility
  };

  return (
    <div className="parent-container" style={parentContainerStyle}>
            <div className="text-container"> {/* Added container for text */}
      <h3>TRS Employer Finder</h3>
      <p className="founder-text">
This resource lists employers contributing to the Texas Teacher Retirement System. Users are encouraged to validate the information, which may not be current or complete.
      </p>
      </div>

      <div className="over-container">
        <div className="left-container">
          {/* Left container content */}
        </div>
        {/* Additional content or images can be added here */}
      </div>
      <div className="under-container">
        <Link to="/products">See Employers</Link>
      </div>
    </div>
  );
};

export default Home;
