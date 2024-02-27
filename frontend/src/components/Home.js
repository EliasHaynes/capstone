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
import MobileHome from "./mobile components/MobileHome";
import Dashboard from "./Dashboard";

function Home() {
  const navigate = useNavigate();

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <div>
    <div className="desktop">
      {!isAuthenticated ? (
        <div className="landing-main-display">
          <button
            className="login-button"
            onClick={() => {
              loginWithRedirect();
              console.log("user from button", user);
            }}
          >
            Login / Register
          </button>
        </div>
      ) : (
        <Dashboard></Dashboard>
      )}

      <h1 className="services">Services</h1>
      <div className="wrap-page-buttons">
        <div className="page-buttons">
          <section>
            <div className="page-buttons-img-container-left first-pic"></div>
            <div className="page-buttons-text-box">
              <h3>Register your vehicles profile</h3>
              <p>
                Create your vehicles profile to have easy access to your
                vehicles data.
              </p>
              <h4 className="page-buttons-anchors">
                <a
                  onClick={() =>
                    !isAuthenticated
                      ? loginWithRedirect()
                      : navigate("/registerCar")
                  }
                >
                  Click Here to register
                </a>
              </h4>
            </div>
          </section>
          <section>
            <div className="page-buttons-img-container-left third-pic"></div>

            <div className="page-buttons-text-box">
              <h3>Get Relative Scheduled Maintenance</h3>
              <p> </p>
              <h4 className="page-buttons-anchors">
                <a
                  onClick={() =>
                    !isAuthenticated
                      ? loginWithRedirect()
                      : navigate("/userMaintenace")
                  }
                >
                  {" "}
                  Click here to view upcoming maintenance
                </a>
              </h4>
            </div>
          </section>

          <section className="landing-alternate-background">
            <div className="page-buttons-text-box">
              <h3>Document personal and professional repairs</h3>
              <p> </p>
              <h4 className="page-buttons-anchors">
                <a
                  onClick={() =>
                    !isAuthenticated ? loginWithRedirect() : navigate("/repair")
                  }
                >
                  Click here to view repair records
                </a>
              </h4>
            </div>
            <div className="page-buttons-img-container-right fourth-pic"></div>
          </section>
        </div>
      </div>

    </div>
    <div className="mobile">
      <MobileHome></MobileHome>
    </div>
    </div>
  );
}

export default Home;
