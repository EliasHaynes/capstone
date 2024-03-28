import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertTrigger from "./AlertTrigger";

function VehicleProfiles() {
  const navigate = useNavigate();
  const [selectedProfile, setProfile] = useState();
  const [usersVehicleProfiles, setUsersVehiclesProfiles] = useState([]);
  const [reload, setReload] = useState(false);
  const [alert, sendAlert] = useState(false);
  const [alertType, setAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { isAutheticated, user } = useAuth0();

  const user_id = user.sub.split("|")[1].toString();

  useEffect(() => {
    console.log("Running");
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
  }, [reload]);

  useEffect(() => {
    const timer = setTimeout(() => {
      sendAlert(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertType, alertMessage]);

  const handleSubmitOfUpdatingCurrentVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/toggleCurrentAndNewCurrent/${user_id}/${selectedProfile}`,
        { selectedProfile }
      );
      switch (response.data.message) {
        case "Profile updated successfully":
          setAlert("success");
          setAlertMessage("Your current vehicle profile is updated");
          break;
        case "":
          setAlert("error");
          setAlertMessage("Something went wrong please refresh and try again");
          break;
      }
      sendAlert(true);
    } catch (e) {
      console.error(e);
      alert("An error occurred while updating the profile.");
    }

    setReload((currentState) => !currentState);
  };

  //Handles selecting the
  const handleProfileSelection = (e) => {
    const newValue = Number(e.target.value);
    setProfile(newValue);
    console.log(`New selection: ${newValue}, Type: ${typeof newValue}`);
  };

  const handleDelete = (v_id) => {
    // Optimistically remove the vehicle from the state
    const updatedVehicles = usersVehicleProfiles.filter(
      (vehicle) => vehicle.v_id !== v_id
    );
    setUsersVehiclesProfiles(updatedVehicles);

    axios
      .delete(`http://localhost:5000/deleteVehicle/${v_id}`)
      .then((response) => {
        // Check if the deletion was successful on the server
        // If the server sends back a not successful response, revert the change
        if (!response.data.success) {
          // This is just a placeholder, you'll need to adjust based on your actual API response
          console.error("Deletion failed on the server, reverting");
          setUsersVehiclesProfiles(usersVehicleProfiles); // Revert to the original state
        } else {
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Revert to the original state in case of an error
        setUsersVehiclesProfiles(usersVehicleProfiles);
      });
  };

  console.log("selectedProfile:", selectedProfile)
  return (
    <div className="vehicle-profile-wrap-container">
      {alert && (
        <AlertTrigger alertType={alertType} alertMessage={alertMessage} />
      )}
      <div className="vehicle-profile-container">
        <h1>Vehicle Profile(s)</h1>
        <form onSubmit={(e) => handleSubmitOfUpdatingCurrentVehicle(e)}>
          {usersVehicleProfiles.map((vehicle, idx) => (
            <>
              <label key={idx}>
                <input
                  onChange={handleProfileSelection}
                  type="radio"
                  checked={selectedProfile === vehicle.v_id}
                  name="radio"
                  value={vehicle.v_id}
                />{" "}
                {vehicle.v_ymm}
                {vehicle.currentVProfile === 0 ? (
                  <DeleteIcon
                    className="icon text-red"
                    onClick={() => handleDelete(vehicle.v_id)}
                  ></DeleteIcon>
                ) : null}
                {usersVehicleProfiles.length === 1 ? (
                  <DeleteIcon
                    className="icon text-red"
                    onClick={() => handleDelete(usersVehicleProfiles[0].v_id)}
                  ></DeleteIcon>
                ) : null}
              </label>
            </>
          ))}
          <div>
            {usersVehicleProfiles.length > 1 ? (
              <button
                className="button-82-pushable"
                role="button"
                type="submit"
              >
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">Update Selection</span>
              </button>
            ) : null}
          </div>

        </form>
        </div>
        <div></div>
        <button
          onClick={() => navigate("/registerCar")}
          className="button-82-pushable"
          role="button"
        >
          <span class="button-82-shadow"></span>
          <span class="button-82-edge"></span>
          <span class="button-82-front text">Add Vehicle</span>
        </button>
      
      <div>
        <button className="button-82-pushable" role="button" type="submit">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span  onClick={() => navigate(`/updateMileage/${user_id}/${selectedProfile}`)} className="button-82-front text">Update mileage</span>
        </button>
      </div>
    </div>
  );
}

export default VehicleProfiles;
