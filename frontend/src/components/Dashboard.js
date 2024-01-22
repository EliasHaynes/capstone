import React from "react";

function Dashboard() {
  return (
    <div>
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
      <button>Manage Vehicle Profiles</button>
    </div>
  );
}

export default Dashboard;
