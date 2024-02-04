import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

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
          <h3>Vehicle Name</h3>
          <h4>Vehicle Engine</h4>
          <h4>Vehicle Trim</h4>
          <h4>Vehicle Transmission</h4>
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
