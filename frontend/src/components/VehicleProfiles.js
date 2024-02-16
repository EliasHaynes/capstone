import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteIcon from "@mui/icons-material/Delete";

function VehicleProfiles() {
  const navigate = useNavigate();
  const [selectedProfile, setProfile] = useState();
  const [usersVehicleProfiles, setUsersVehiclesProfiles] = useState([]);

  const { isAutheticated, user } = useAuth0();

  const user_id = user.sub.split("|")[1].toString();
  console.log("user-Id in vehicle profiles:", user_id);

  console.log("The users vehicles profiles:", usersVehicleProfiles);
  console.log("The selected profile:", selectedProfile);

  useEffect(() => {
    console.log("Running")
    const getVehicleProfilesAndCurrent = async () => {
      try {
        const allVehiclesResponse = await axios.get(
          `http://localhost:5000/getVehicles/${user_id}`
        );
        const currentVehicleResponse = await axios.get(
          `http://localhost:5000/getCurrentVehicle/${user_id}`
        );


        setUsersVehiclesProfiles(allVehiclesResponse.data);
        setProfile(currentVehicleResponse.data[0].v_id); 
      } catch (e) {
        console.error(e);
      }
    };
    getVehicleProfilesAndCurrent();
  }, []);

  const handleSubmit = (e) => {
    //The user has selected their current vehicle profile. Send this to the backend to save this selection.
    e.preventDefault();
    axios.put(
      `http://localhost:5000/toggleCurrentAndNewCurrent/${user_id}/${selectedProfile}`,
      { selectedProfile }
    );
    console.log("The selected profile is...", selectedProfile);
  };

  const handleProfileSelection = (e) => {
    const newValue = Number(e.target.value); // Convert to number if `v_id` is a number
    setProfile(newValue);
    console.log(`New selection: ${newValue}, Type: ${typeof newValue}`);
  };


  const handleDelete = (v_id) => {
    // Optimistically remove the vehicle from the state
    const updatedVehicles = usersVehicleProfiles.filter(vehicle => vehicle.v_id !== v_id);
    setUsersVehiclesProfiles(updatedVehicles);

    axios.delete(`http://localhost:5000/deleteVehicle/${v_id}`)
      .then(response => {
        // Check if the deletion was successful on the server
        // If the server sends back a not successful response, revert the change
        if (!response.data.success) {
          // This is just a placeholder, you'll need to adjust based on your actual API response
          console.error("Deletion failed on the server, reverting");
          setUsersVehiclesProfiles(usersVehicleProfiles); // Revert to the original state
        }
      })
      .catch(error => {
        console.error("An error occurred:", error);
        // Revert to the original state in case of an error
        setUsersVehiclesProfiles(usersVehicleProfiles);
      });
};


  return (
    <div className="vehicle-profile-wrap-container">
      <div className="vehicle-profile-container">
        <h1>Vehicle Profiles</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          {usersVehicleProfiles.map((vehicle, idx) => (
            <>
            <label key={idx}>
              <input
                onChange={handleProfileSelection}
                type="radio"
                checked={selectedProfile === vehicle.v_id} // This line is changed
                name="radio"
                value={vehicle.v_id}
              />{" "}
              {vehicle.v_ymm}
              {/* Conditioning for the vehicle that is current. Insert "<span className="checkmark"></span>" */}
              <DeleteIcon className="icon text-red" onClick={() => handleDelete(vehicle.v_id)}></DeleteIcon>
            </label>
            
            </>
          ))}
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
