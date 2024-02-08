import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function VehicleProfiles() {
  const navigate = useNavigate();
  const [selectedProfile, setProfile] = useState(null);
  const [usersVehicleProfiles, setUsersVehiclesProfiles] = useState([]);

  const { isAutheticated, user } = useAuth0();

  const user_id = user.sub.split("|")[1].toString();
  console.log("user-Id in vehicle profiles:", user_id)

  console.log("The users vehicles profiles:", usersVehicleProfiles);

  useEffect(() => {
    console.log("1 useEffect start")
    const getVehicleProfilesAndCurrent = async () => {
      console.log("2 after async function")
      try {
        console.log("3 after try block")
        //Recieve all of users registered vehicles
        const allVehicles = await axios.get(
          `http://localhost:5000/getVehicles/${user_id}`
        );
        console.log("All Vehicles:", allVehicles)
        setUsersVehiclesProfiles(allVehicles.data);

        //This is a check first condition. It is checking if the user has only 1 registered vehicle.
        //If they do then that vehicle is the current by default.

        // if (allVehicles.length > 1) {
        //     setProfile(allVehicles[0])
        // } else {
        //   const currentVehicle = await axios.get(`/getCurrentVehicle/${user_id}`)
        //   setProfile(currentVehicle)
        // }

        //Recieve the currently selected vehicle. (This is temporary until the check first condition^ is polished)
        const currentVehicle = await axios.get(`http://localhost:5000/getCurrentVehicle/${user_id}`);
        setProfile(currentVehicle.data);
      } catch (e) {
        console.log("4 after catch block")
        console.log(e);
      }
    };
    getVehicleProfilesAndCurrent();
  }, []);

  const handleSubmit = (e) => {
    //The user has selected their current vehicle profile. Send this to the backend to save this selection.
    e.preventDefault();
    // axios.put(
    //   `http://localhost:5000/toggleCurrentAndNewCurrent/${user_id}/${v_id}`
    // );
    console.log("The selected profile is...", selectedProfile);
  };

  const handleProfileSelection = (e) => {
    // setProfile(e.target.key);
    console.log(e.target.key);
  };

  return (
    <div className="vehicle-profile-wrap-container">
      <div className="vehicle-profile-container">
        <h1>Vehicle Profiles</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          {usersVehicleProfiles.map((vehicle, idx) => (
            <label key={vehicle.v_id}>
              <input
                onClick={(e) => handleProfileSelection(e)}
                type="radio"
                name="radio"
                value="one"
              />{" "}
              {vehicle.v_ymm}
              {/* Conditioning for the vehicle that is current. Insert "<span className="checkmark"></span>" */}
              {vehicle.currentVProfile ? null : (
                <span className="checkmark"></span>
              )}
            </label>
          ))}
          {/* <label className="container">
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
          </label> */}
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
