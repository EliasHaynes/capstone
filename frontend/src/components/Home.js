import Navigation from "./Navigation";
import React, { useState } from "react";
import cookie from 'cookie'
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {

  const navigate = useNavigate()
  return (
       <div>
        <h2>Lets Get Started!</h2>
        <button onClick={() => {
          navigate('/registercar')
        }}> Register Car</button>
       </div> 
  )
}

export default Home;