import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate();
  const { isAutheticated, user } = useAuth0();
  
  const [vehicle,setVehicle] = useState()

  const user_id = user.sub.split("|")[1].toString();

  useEffect(()  => {
    const fetchCurrentVehicle = async () => {
      try {
        const currentVehicleResponse = await axios.get(
          `http://localhost:5000/getCurrentVehicle/${user_id}`
        );
        console.log("currentVehicleResponse:", currentVehicleResponse)

        setVehicle(currentVehicleResponse.data[0])
      } catch (e) {
        console.error(e);
      }
    }
    fetchCurrentVehicle()
     
  },[])

  console.log("vehicle:", vehicle)

  function NoVehicles() {
    return (
      <div className="no-vehicle-profiles">
        <div>
          <img/>
        </div>
        <h2>No current vehicle profiles registered...</h2>
        <button>Click here to register a vehicle</button>
      </div>
    )
  };
  
  return (
    <div className="root-dashboard">
      <div className="wrapper-dashboard">
        <div className="vehicle-info-container">
          <h1>Your Current Vehicle Profile</h1>
          {/* <h3>Year Make Model: {vehicle.v_ymm}</h3>
          <h4>Trim: {vehicle.v_trim}</h4>
          <h4>Engine: {vehicle.v_engine}</h4>
          <h4>{vehicle.v_transmission}</h4> */}
        </div>
        <div className="vehicle-image">
          <img></img>
        </div>
      </div>
      <button onClick={() => navigate("/vehicleprofiles")}>Manage Vehicle Profiles</button>
    </div>
  );
}

export default Dashboard;
