import React from "react";
import Navigation from "../Navigation";
import cookie from "cookie";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../index.css"
import {
  faScrewdriverWrench,
  faCircleInfo,
  faClipboardList,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../Dashboard";

function MobileLandingPage() {
    const navigate = useNavigate();

    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0(); 

    return(
        <div className="beforeLogin mobile">
          <div className="landing-main-display">
            <button className="login-button" onClick={loginWithRedirect}>Login / Register</button>
          
            {/* <h1> Must Register / Login First</h1> */}
          </div>
          {isAuthenticated ? <Dashboard></Dashboard>: null}
          <h1 className="services">Services</h1>
          <div className="wrap-page-buttons">
          <div className="page-buttons">
            <section className="first-pic">
              
              <div className="page-buttons-text-box">
                <h3>Register your vehicles profile</h3>
                <p>Create your vehicles profile to have easy access to your vehicles data.</p>
                <h4 className="page-buttons-anchors"><a onClick={() =>
                      !isAuthenticated
                        ? loginWithRedirect()
                        : navigate("/registerCar")
                    }>Click Here to register</a></h4>
              </div>
            </section>

            <section className="second-pic">
              <div className="page-buttons-text-box">
                <h3>Get Specs on your Vehicle</h3>
                <p> </p>
                <h4 className="page-buttons-anchors"><a onClick={() =>
                      !isAuthenticated
                        ? loginWithRedirect()
                        : navigate("/vindecode")
                    }>Click here to view your vehicles dashboard</a></h4>
              </div>
            </section>

            <section className="third-pic">
              <div className="page-buttons-text-box">
                <h3>Get Relative Scheduled Maintenance</h3>
                <p> </p>
                <h4 className="page-buttons-anchors"><a onClick={() =>
                      !isAuthenticated
                        ? loginWithRedirect()
                        : navigate("/userMaintenace")
                    }>Click here to view upcoming maintenance</a></h4>
              </div>
            </section>

            <section className="fourth-pic">
              <div className="page-buttons-text-box">
                <h3>Document personal and professional repairs</h3>
                <p> </p>
                <h4 className="page-buttons-anchors"><a onClick={() =>
                      !isAuthenticated
                        ? loginWithRedirect()
                        : navigate("/repair")
                    }>Click here to view repair records</a></h4>
              </div>
            </section>
            
          </div>
          </div>
        </div>
    )
}

export default MobileLandingPage;