import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {

  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
  } = useAuth0();



  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: "1" }}>
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
            <Link to="/registerUser">Register User</Link>
          </li>
          <li>
            <Link to="/registerCar"> Register Car</Link>
          </li>
          <li className="nav-list-item">
            <Link to={`/repair`}>Repair Log</Link>
          </li>
          <li>
            {isAuthenticated ? <button onClick={logout}>Logout</button> : <button onClick={loginWithRedirect} >Login</button> }
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;