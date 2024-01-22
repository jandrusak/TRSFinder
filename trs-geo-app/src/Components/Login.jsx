import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import cookie from "cookie"
import { TextField, Button, Container } from "@mui/material";


function Login({setUserLoggedIn}) {
    const [state, setState] = useState({email: "", pwd: ""})
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("https://trsfinder-backend.onrender.com/login", {
            email: state.email,
            pwd: state.pwd,
        })
        .then((response) => {
            document.cookie = 'loggedIn=true;max-age=60*10000'
            document.cookie = cookie.serialize("token", response.data)
            setUserLoggedIn(true)
            navigate('/')
        }) 
        .catch((error) => {
          console.error("Login error: ", error);
          if (error.response && error.response.status === 401) {
            window.alert('Incorrect email or password.')
          } else {
            window.alert('Login error. Please try again.')
          }            
        });
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
          <Button sx={{ backgroundColor: "#f6359d" }}
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <p>Don't Have an Account? <Link to="/register">Register Here</Link></p>

        </form>
      </Container>
    </div>
  )
}

export default Login