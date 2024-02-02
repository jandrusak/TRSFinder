import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Container } from "@mui/material";
// import "./Form.css"
import { useNavigate, Link} from 'react-router-dom';

function Register() {
    const [state, setState] = useState({ 
        email: "",
        pwd: "", 
        city: "", 
        full_name: "",
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("sending:", state)
        try {
        const response = await axios.post("https://trsfinder-backend.onrender.com/register", state, {
        headers: {'Content-Type': 'application/json'}
        });
        console.log('response:', response);
        navigate("/login");
        } catch(error) {
          console.error("registration error: ", error);
          if (error.response) {
            console.error("error response: ", error.response);
          }
        }
      };
  return (
    <div>
        <Container maxWidth="sm">
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            required
            onChange={handleChange}
            value={state.email}
            name="email"
            label="Email"
            type="text"
          />
          <TextField
            required
            onChange={handleChange}
            value={state.pwd}
            name="pwd"
            label="Password"
            type="password"
          />
           <TextField
            required
            onChange={handleChange}
            value={state.city}
            name="city"
            label="City"
            type="text"
          />
           <TextField
            required
            onChange={handleChange}
            value={state.full_name}
            name="full_name"
            label="FullName"
            type="text"
          />
          <Button sx={{ backgroundColor: "#f6359d" }}
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <p>Already Registered? <Link to="/login">Login</Link></p>
        </form>
      </Container>
    </div>
  )
}

export default Register