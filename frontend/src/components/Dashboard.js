import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const { isAutheticated, user } = useAuth0();
  const [vehicle, setVehicle] = useState();
  const [vehicleImage,setImage] = useState();

  const user_id = user.sub.split("|")[1].toString();
  const token = process.env.REACT_APP_CAR_KEY
  const key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const fetchCurrentVehicle = async () => {
      try {
        const currentVehicleResponse = await axios.get(
          `http://localhost:5000/getCurrentVehicle/${user_id}`
        );
        console.log("currentVehicleResponse:", currentVehicleResponse);
        if (currentVehicleResponse.data.length > 0) {
          setVehicle(currentVehicleResponse.data[0]);
          const vin = currentVehicleResponse.data[0].vin
          const image = await axios.get(`http://api.carmd.com/v3.0/image?vin=${vin}`, {
            headers: {
              authorization: token,
              "partner-token": key
            }
          })
          console.log("Vehicle image:", image.data.data)
          setImage(image.data.data)     
        } else {
          setVehicle("No Vehicle");
        }
      } catch (e) {
        console.error(e);
      }
    };

    // const vehicleImg = async () => {
    //   try {
    //       const image = await axios.request(`http://api.carmd.com/v3.0/image?${}`)

    //   }
    //   catch(e) {
    //     console.error(e)
    //   }
    // }
    fetchCurrentVehicle();
  }, []);

  console.log("vehicles:", vehicle);

  function NoVehicles() {
    return (
      <div className="no-vehicle-profiles">
        <div>
          <img />
        </div>
        <h2>No current vehicle profiles registered...</h2>
        <button onClick={() => navigate("/registerCar")}>Click here to register a vehicle</button>
      </div>
    );
  }

  return (
    <div className="root-dashboard">
      <div className="wrapper-dashboard">
        <h1>Your Current Vehicle Profile:</h1>
        
        <div className="vehicle-info-container">
          {vehicleImage ? <img className="vehicle-img" src={vehicleImage.image}></img> : null}
          {vehicle === "No Vehicle" ? (
            <NoVehicles></NoVehicles>
          ) : (
            <div className="vehicle-info-container">
              {" "}
              
              <h3>Year Make Model: {vehicle ? vehicle.v_ymm : null}</h3>
              <h4>Trim: {vehicle ? vehicle.v_trim : null}</h4>
              <h4>Engine: {vehicle ? vehicle.v_engine : null}</h4>
              <h4>Transmission: {vehicle ? vehicle.v_transmission : null}</h4>
            </div>
          )}
          <div className="vehicle-image">
            <img></img>
          </div>
        </div>
        {vehicle === "No Vehicle" ? null : <button onClick={() => navigate("/vehicleprofiles")}>
          Manage Vehicle Profiles
        </button> }
      </div>
    </div>
  );
}

export default Dashboard;
