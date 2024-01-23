import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function VehicleProfiles() {
    const navigate = useNavigate();
  const [selectedProfile, setProfile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("The selected profile is...", selectedProfile)
  };

  const handleProfileSelection = (e) => {
    setProfile(e.target.value);
    console.log(e.target.value);
  };
  console.log("Current Profile:", selectedProfile);
  return (
    <div>
      <h1>Vehicle Profiles</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="container">
          One
          <input
            onClick={(e) => handleProfileSelection(e)}
            type="radio"
            name="radio"
            value="one"
          />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          Two
          <input
            onClick={(e) => handleProfileSelection(e)}
            type="radio"
            name="radio"
            value="two"
          />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          Three
          <input
            onClick={(e) => handleProfileSelection(e)}
            type="radio"
            name="radio"
            value="three"
          />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          Four
          <input
            onClick={(e) => handleProfileSelection(e)}
            type="radio"
            name="radio"
            value="four"
          />
          <span className="checkmark"></span>
        </label>
        <button type="submit">Select Vehicle Profile</button>
      </form>
      <button onClick={()=> navigate("/vindecode")}>Add Another Vehicle Profile</button>
    </div>
  );
}

export default VehicleProfiles;
