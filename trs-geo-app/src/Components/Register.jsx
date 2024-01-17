import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Container } from "@mui/material";
// import "./Form.css"
import { useNavigate, Link} from 'react-router-dom';

function Register() {
    const [state, setState] = useState({ 
        email: "",
        pwd: "", 
        first_name: "", 
        last_name: "",
        phone: "",
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
            value={state.first_name}
            name="first_name"
            label="First Name"
            type="text"
          />
           <TextField
          required
          onChange={handleChange}
          value={state.last_name}
          name="last_name"
          label="Last Name"
          type="text"
        /> 
        <TextField
        required
        onChange={handleChange}
        value={state.phone}
        name="phone"
        label="Phone"
        type="phone"
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