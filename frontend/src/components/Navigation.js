import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import NavModal from "./mobile components/NavModal";
import Authentication from "./Authentication";

const Navigation = () => {
  const navigate = useNavigate()
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
  } = useAuth0();



  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton color="inherit">
          <NavModal></NavModal>
        </IconButton>
        <Typography  onClick={() => navigate('/')} variant="h6" style={{ flexGrow: "1", cursor: "pointer", marginLeft: "5%" }}>
          Maintenance App
        </Typography>
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/vindecode">Vin</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/userMaintenace">Maintenance</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/registerCar"> Register Car</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/repair">Repair Log</Link>
          </li>
          <li>
            <Authentication></Authentication>
          </li>
        </ul>
        {isAuthenticated ? <button className="mobile-login" onClick={logout}>Logout</button> : <button className="mobile-login" onClick={loginWithRedirect} >Login</button> }
      </Toolbar>
    </AppBar>
  );
};



export default Navigation;