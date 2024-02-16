import Navigation from "./Navigation";
import React, { useState } from "react";
import cookie from "cookie";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScrewdriverWrench,
  faCircleInfo,
  faClipboardList,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import LandingPage from "./LandingPage";
import MobileLandingPage from "./mobile components/MobileLandingPage";
import Dashboard from "./Dashboard";

function Home() {
  const navigate = useNavigate();

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  console.log("The user:", user)
  return (
    <div className="home">
      {!isAuthenticated ? (
        <div>
        <LandingPage></LandingPage>
        <MobileLandingPage></MobileLandingPage>
        </div>
      ) : (
        <div>
          <LandingPage></LandingPage>
          <MobileLandingPage></MobileLandingPage>
          </div>
      )}
    </div>
  );
}

export default Home;
