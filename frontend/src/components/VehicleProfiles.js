import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertTrigger from "./AlertTrigger";
import { useDispatch, useSelector } from 'react-redux';
import { clearData,clearAlert } from "../redux/store";

function VehicleProfiles() {
  const navigate = useNavigate();
  const [selectedProfile, setProfile] = useState();
  const [usersVehicleProfiles, setUsersVehiclesProfiles] = useState([]);
  const [reload, setReload] = useState(false);
  const [alert, sendAlert] = useState(false);
  const [alertType, setAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { isAutheticated, user } = useAuth0();

const dispatch = useDispatch()
  const user_id = user.sub.split("|")[1].toString();

  useEffect(() => {
    const getVehicleProfilesAndCurrent = async () => {
      try {
        const allVehiclesResponse = await axios.get(
          `https://capstone-ten-lyart.vercel.app/getVehicles/${user_id}`
        );
        const currentVehicleResponse = await axios.get(
          `https://capstone-ten-lyart.vercel.app/getCurrentVehicle/${user_id}`
        );
        setUsersVehiclesProfiles(allVehiclesResponse.data);
        setProfile(currentVehicleResponse.data[0].v_id);
      } catch (e) {
        return "Error: " + e
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
    dispatch(clearData())
    dispatch(clearAlert())
    try {
      const response = await axios.put(
        `https://capstone-ten-lyart.vercel.app/toggleCurrentAndNewCurrent/${user_id}/${selectedProfile}`,
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
      return "Error: " + e
    }

    setReload((currentState) => !currentState);
  };

  //Handles selecting the
  const handleProfileSelection = (e) => {
    const newValue = Number(e.target.value);
    setProfile(newValue);
  };

  const handleDelete = async (v_id) => {
    // Optimistically remove the vehicle from the state
      const updatedVehicles = usersVehicleProfiles.filter(
      (vehicle) => vehicle.v_id !== v_id
    );

    console.log("updated Vehicles:", updatedVehicles)
     setUsersVehiclesProfiles(updatedVehicles);

    try { 
      console.log("Initial users vehicle profiles:", usersVehicleProfiles)   

    const response = await axios.delete(`https://capstone-ten-lyart.vercel.app/deleteVehicle/${v_id}`)
    console.log("response:", response)
      if (!response.data.success) {
        console.log("Success!!!")
          setUsersVehiclesProfiles(usersVehicleProfiles);
          setReload((currentState) => !currentState);
       }
    } catch(e) {
      console.log("Delete error:", e);
    }
    console.log("Exiting Delete function...")
  };
  console.log("users vehicles profiles in component:", usersVehicleProfiles)
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
                {vehicle.v_id}
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
<div className="profile-additional-buttons-container">


      <div className="profile-additional-buttons">
        <h3> Register a new vehicle</h3>
        <button
          onClick={() => navigate("/registerCar")}
          className="button-82-pushable"
          role="button"
        >
          <span class="button-82-shadow"></span>
          <span class="button-82-edge"></span>
          <span class="button-82-front text">Add Vehicle</span>
        </button>
      </div>

      <div className="profile-additional-buttons">
        <h3>Update the mileage of selected vehicle profile</h3>
        <button className="button-82-pushable" role="button" type="submit">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span
            onClick={() =>
              navigate(`/updateMileage/${user_id}/${selectedProfile}`)
            }
            className="button-82-front text"
          >
            Update mileage
          </span>
        </button>
      </div>
      </div>
    </div>
  );
}

export default VehicleProfiles;
