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

          {/* <h1 style={{ alignItems: "center" }}>Lets Get Started!</h1>
          <h4> Head to this form and get informed (Required)</h4>
          <button onClick={() => navigate("/registerCar")}>Register Car</button> */}
          <LandingPage></LandingPage>
          <MobileLandingPage></MobileLandingPage>
          {/* <h2 className="home" style={{ marginTop: "100px" }}>
            Features of this app:
          </h2>
          <div className="icon-grid-container" style={{ marginTop: "50px" }}>
            <div className="icons home">
              <FontAwesomeIcon
                onClick={() => navigate("/registerCar")}
                className="box1"
                icon={faFileLines}
                size="10x"
                fontSize={"200px"}
                style={{ color: "#1e57b8" }}
              >
                {" "}
                <Link to={"/registerCar"}></Link>{" "}
              </FontAwesomeIcon>
              <h3>Register Your Car</h3>
            </div>
            <div className="icons home">
              <FontAwesomeIcon
                onClick={() => navigate("/vindecode")}
                className="box2"
                icon={faCircleInfo}
                size="10x"
                fontSize={"200px"}
                style={{ color: "#1e57b8" }}
              />
              <h3> Get specs on your vehicle</h3>
            </div>
            <div className="icons home">
              <FontAwesomeIcon
                onClick={() => navigate("/userMaintenace")}
                className="box3"
                icon={faClipboardList}
                size="10x"
                fontSize={"200px"}
                style={{ color: "#1e57b8" }}
              />
              <h3>Get relative scheduled maintenace</h3>
            </div>
            <div className="icons home">
              <FontAwesomeIcon
                onClick={() => navigate("/repair")}
                className="box4"
                icon={faScrewdriverWrench}
                size="10x"
                fontSize={"200px"}
                style={{ color: "#1e57b8" }}
              />
              <h3> Document repairs on a log</h3>
            </div> */}
          </div>
      )}
    </div>
  );
}

export default Home;
