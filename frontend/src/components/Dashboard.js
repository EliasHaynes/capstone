import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const { isAutheticated, user } = useAuth0();
  const [vehicle, setVehicle] = useState();
  const [imgURL, setImage] = useState();

  const user_id = user.sub.split("|")[1].toString();
  const token = process.env.REACT_APP_CAR_KEY;
  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchCurrentVehicle = async () => {
      try {
        const currentVehicleResponse = await axios.get(
          `https://capstone-ten-lyart.vercel.app/getCurrentVehicle/${user_id}`
        );
        if (currentVehicleResponse.data.length > 0) {
          setVehicle(currentVehicleResponse.data[0]);
          setImage(currentVehicleResponse.data[0].v_img);
        } else {
          setVehicle("No Vehicle");
        }
      } catch (e) {
        return "Error: " + e

      }
    };
    fetchCurrentVehicle();
  }, []);

  function NoVehicles() {
    return (
      <div className="no-vehicle-profiles">
        <div>
          <img />
        </div>
        <h2>No current vehicle profiles registered...</h2>
        <button onClick={() => navigate("/registerCar")}>
          Click here to register a vehicle
        </button>
      </div>
    );
  }

  function NoCurrentVehicle() {
    return <div></div>;
  }

  return (
    <div className="root-dashboard">
      <div className="wrapper-dashboard">
        <h1>Your Current Vehicle Profile: </h1>

        <div className="vehicle-info-container">
          {imgURL ? <img className="vehicle-img" src={imgURL}></img> : null}
          {vehicle === "No Vehicle" ? (
            <NoVehicles></NoVehicles>
          ) : (
            <div className="vehicle-info-container">
              {" "}
              <h3>Year Make Model: {vehicle ? vehicle.v_ymm : null}</h3>
              <h4>Mileage: {vehicle ? vehicle.mileage: null}</h4>
              <h4>Trim: {vehicle ? vehicle.v_trim : null}</h4>
              <h4>Engine: {vehicle ? vehicle.v_engine : null}</h4>
              <h4>Transmission: {vehicle ? vehicle.v_transmission : null}</h4>
            </div>
          )}
          <div className="vehicle-image">
            <img></img>
          </div>
        </div>
        {vehicle === "No Vehicle" ? null : (
          <button
          className="button-82-pushable"
            onClick={() => navigate("/vehicleprofiles")}
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">Manage Vehicles</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
