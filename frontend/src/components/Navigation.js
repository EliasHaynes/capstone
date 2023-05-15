import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import cookie from "cookie";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = () => {
  const navigate = useNavigate();

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
            <Link to="/repair">Repair Log</Link>
          </li>

          <li
            className="nav-list-item"
            onClick={() => {
              document.cookie = cookie.serialize("loggedIn", null, {
                maxAge: 0
              });
              navigate("/login");
            }}
          >
            Logout
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;