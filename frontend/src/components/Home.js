import Navigation from "./Navigation";
import React, { useState } from "react";
import cookie from 'cookie'
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const {
      loginWithRedirect, 
      logout, 
      user, 
      isAuthenticated,
      getAccessTokenSilently
    } = useAuth0()
  
  

  
    console.log(isAuthenticated)
    return (
      <div>
        <h1>{isAuthenticated ? "Logged in" : "Logged Out"}</h1>
        <ul>
          <button onClick={loginWithRedirect}>Login</button>
          <button onClick={logout}>Logout</button>
        </ul>
        {isAuthenticated && (
          <pre>{JSON.stringify(user.sub,null,2)}</pre>
        )}
      </div>
    )
}

export default Home;