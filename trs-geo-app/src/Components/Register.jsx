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
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("https://sourcingmagic-backend.onrender.com/register", state)
        .then(() => {
            navigate("/login")
        }) 
        .catch((error) => {
          console.error("registration error: ", error)
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
           <TextField
            required
            onChange={handleChange}
            value={state.city}
            name="city"
            label="City"
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