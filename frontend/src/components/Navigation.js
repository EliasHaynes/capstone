import React,{useState} from "react";
import { Link, useNavigate,NavLink } from "react-router-dom";
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
  const [currentPage,setCurrentPage] = useState("Home")

  const hightlightCurrentPage = () => {

  }

  return (
    <AppBar position="relative">
      <Toolbar className="navbar">
        <IconButton color="inherit">
          <NavModal></NavModal>
        </IconButton>
        <Typography  onClick={() => navigate('/')} variant="h6" style={{ flexGrow: "1", cursor: "pointer", marginLeft: "5%" }}>
          Maintenance App
        </Typography>
        <ul className="nav-list ">
          <li className="nav-list-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink to="/registerCar"> Register Car</NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink to="/userMaintenace">Maintenance</NavLink>
          </li>
          <li className="nav-list-item">
            <NavLink to="/repair">Repair Log</NavLink>
          </li>
          <li className="nav-list-item">
            <Authentication></Authentication>
          </li>
        </ul>
        {isAuthenticated ? <button className="mobile-login button-29" onClick={logout}>Logout</button> : <button className="mobile-login button-29" onClick={loginWithRedirect} >Login</button> }
      </Toolbar>
    </AppBar>
  );
};



export default Navigation;