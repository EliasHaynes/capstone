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
    
    

    
      async function callProtectedApi() {
        try {

            const token = await getAccessTokenSilently()
            const response = await axios.get('http://localhost:5000/protected', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
        
    }
    
      console.log(isAuthenticated)
      return (
        <div>
          <h1>{isAuthenticated ? "Logged in" : "Logged Out"}</h1>
          {isAuthenticated && (
            <pre>{JSON.stringify(user,null,2)}</pre>
          )}
        </div>
      )
}

export default Home;