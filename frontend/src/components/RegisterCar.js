import React, { useState, useEffect } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import vinPic from "../assets/vin.png";

const RegisterCar = (props) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth0();

  const user_id = user.sub.split("|")[1].toString();
  const [vin, setVin] = useState("");
  const [mileage, setMileage] = useState("");
  const [open, toggleOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getVehicles/${user_id}`
        );
        setVehicles(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getVehicles();
  }, []);

  const MaxVehicles = () => {
    return <div>Max limit of registered vehicles (4) reached</div>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/addVehicle/${user_id}`, { vin, mileage })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-page">
      <div className="register-main-container">
        <div className=" register-wrapper">
          <img src={vinPic} className="register-image"></img>
          <div className="register-right-side-form">
            {vehicles.length >= 4 ? (
              <MaxVehicles />
            ) : (
              <form
              className="register-form"
                onSubmit={(e) => {
                  handleSubmit(e);
                  toggleOpen(true);
                }}
              >
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
                <button
                  type="submit"
                  className="login-button"
                  variant="contained"
                  color="primary"
                >
                  Submit Info
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCar;
