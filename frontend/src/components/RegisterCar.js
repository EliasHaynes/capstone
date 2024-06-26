import React, { useState, useEffect } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import vinPic from "../assets/Blue-And-White-Modern-Car-Insurance-Instagram-Post-1-1024x1024.webp";
import AlertTrigger from "./AlertTrigger";

const RegisterCar = (props) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth0();

  const user_id = user.sub.split("|")[1].toString();
  const [vin, setVin] = useState("");
  const [mileage, setMileage] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [alert, sendAlert] = useState(false);
  const [alertType, setAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await axios.get(
          `https://capstone-ten-lyart.vercel.app/getVehicles/${user_id}`
        );
        setVehicles(response.data);
      } catch (e) {
        return "Error: " + e
      }
    };
    getVehicles();
  }, [reload]);

  useEffect(() => {
    const timer = setTimeout(() => {
      sendAlert(false);
    }, 8000);
    return () => {
      clearTimeout(timer);
      setReload((currentState) => !currentState);
    };
  }, [alertType, alertMessage]);

  const MaxVehicles = () => {
    return <div>Max limit of registered vehicles (4) reached</div>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://capstone-ten-lyart.vercel.app/addVehicle/${user_id}`, { vin, mileage })
      .then((res) => {
        switch (res.status) {
          case 200:
            setAlert("success");
            setAlertMessage("Vehicle successfully registered");
            break;
          case 204:
            setAlert("error");
            setAlertMessage(
              "Vin not found, please check that youve entered the correct vin. If issue persists vehicle may be too old or new"
            );
          case 207:
            setAlert("error");
            setAlertMessage("You've already registered this vin");
            break;
        }
        sendAlert(true);
      })
      .catch((err) => {
        if (err.response) {
          setAlert("error");
          setAlertMessage(err.response.data.error);
        } else {

          setAlert("error");
          setAlertMessage("An unexpected error occurred");
        }
      });
  };


  return (
    <div className="register-page">
      {alert && (
        <AlertTrigger alertType={alertType} alertMessage={alertMessage} />
      )}
      
      <div className="register-main-container">
        <h1>Register a Vehicle</h1>
        <div className=" register-wrapper">
          {vehicles.length >= 4 ? (
            <MaxVehicles />
          ) : (
            <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
              <label>
                <input
                  required
                  onChange={(e) => setVin(e.target.value)}
                  name="vin"
                  label="vin"
                  placeholder="vin"
                  type="text"
                />
              </label>
              <label>
                <input
                  required
                  onChange={(e) => setMileage(e.target.value)}
                  name="mileage"
                  label="mileage"
                  placeholder="mileage"
                  type="text"
                />
              </label>

              <button className="button-82-pushable" role="button" type="submit">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">Submit Info</span>
              </button>
            </form>
          )}
          
        </div>
        <div className="register-image-container">

          </div>
      </div>
    </div>
  );
};

export default RegisterCar;
