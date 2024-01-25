import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function VehicleProfiles() {
  const navigate = useNavigate();
  const [selectedProfile, setProfile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("The selected profile is...", selectedProfile);
  };

  const handleProfileSelection = (e) => {
    setProfile(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="vehicle-profile-wrap-container">
      <div className="vehicle-profile-container">
        <h1>Vehicle Profiles</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="container">
            <input
              onClick={(e) => handleProfileSelection(e)}
              type="radio"
              name="radio"
              value="one"
            />{" "}
            One
            <span className="checkmark"></span>
          </label>
          <label className="container">
            <input
              onClick={(e) => handleProfileSelection(e)}
              type="radio"
              name="radio"
              value="two"
            />{" "}
            Two
            <span className="checkmark"></span>
          </label>
          <label className="container">
            <input
              onClick={(e) => handleProfileSelection(e)}
              type="radio"
              name="radio"
              value="three"
            />{" "}
            Three
            <span className="checkmark"></span>
          </label>
          <label className="container">
            <input
              onClick={(e) => handleProfileSelection(e)}
              type="radio"
              name="radio"
              value="four"
            />{" "}
            Four
            <span className="checkmark"></span>
          </label>
          <div>
          <button type="submit">Select Vehicle Profile</button>
          </div>
        </form>
        <button onClick={() => navigate("/registerCar")}>
          Add Another Vehicle Profile
        </button>
      </div>
    </div>
  );
}

export default VehicleProfiles;
