import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertTrigger from "./AlertTrigger";

function UpdateMileage() {
  const { user_id, v_id } = useParams();
  const navigate = useNavigate();
  const [mileage, setMileage] = useState();
  const [alert, sendAlert] = useState(false);
  const [alertType, setAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [returnVehicleProfiles, sendReturn] = useState(false)

  useEffect(() => {
    const fetchVehiclesMileage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getMileage/${user_id}/${v_id}`
        );
        console.log("mileage response:", response.data);
        setMileage(response.data[0]);
        
      } catch (e) {
        console.error(e);
      }
    }
    fetchVehiclesMileage();
  },[]);

  useEffect(() => {
    const timer = setTimeout(() => {
      sendAlert(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertType, alertMessage]);

  const handleUpdatingVehicleMileage = async (e,vin) => {
    e.preventDefault();
    try {
    const response = await axios.put(
      `http://localhost:5000/updateMileage/${user_id}/${v_id}`,
      {
        mileage,
      }
    );
    alerttUser(response)
    sendReturn(true);
    console.log("Update response:", response);
    } catch(e) {
      console.error(e);

    }

  };

  const alerttUser = (response) => {
    if (response.status === 200) {
      sendAlert(true);
      setAlert("success");
      setAlertMessage("Success!");
    } else {
      sendAlert(true);
      setAlert("error");
      setAlertMessage("Sorry, something went wrong");
    }
  };

  return (
    <div>
      {alert && (
        <AlertTrigger alertType={alertType} alertMessage={alertMessage} />
      )}
      <form onSubmit={(e) => handleUpdatingVehicleMileage(e)}>
        <label>
          Update Vehicle Mileage
          <input onChange={(e) => setMileage(e.target.value)}></input>
        </label>
        <div>
        <button className="button-82-pushable" role="button" type="submit">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">Submit</span>
        </button>
        </div>


      </form>        
      <div>
      {returnVehicleProfiles && (
          <div>
                  <button onClick={() => navigate('/vehicleprofiles')} className="button-82-pushable" role="button">
                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge"></span>
                  <span className="button-82-front text">Return</span>
                </button>
                </div>
        )}
        </div>
    </div>
  );
}

export default UpdateMileage;
