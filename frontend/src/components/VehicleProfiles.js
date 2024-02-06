import React, { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react'


function VehicleProfiles() {
  const navigate = useNavigate();
  const [selectedProfile, setProfile] = useState(null);
  const [usersVehicleProfiles, setUsersVehiclesProfiles] = useState([])

  const {
    isAutheticated,
    user,
  } = useAuth0()

  const user_id = user.sub.split('|')[1].toString();

  console.log("The users vehicles profiles:", usersVehicleProfiles)

  useEffect(() => {
    const getVehicleProfiles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getVehicles/${user_id}`, {selectedProfile})
        setUsersVehiclesProfiles(response);
      }
      catch (e) {
        console.error(e);
      }

      getVehicleProfiles();
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/updateVehicle/${user_id}/${}`)
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
          <button type="submit">Update Selection</button>
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
