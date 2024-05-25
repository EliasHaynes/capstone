import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertTrigger from "./AlertTrigger";
import { useDispatch, useSelector } from 'react-redux';
import { clearData,clearAlert } from "../redux/store";

function UpdateMileage() {
  const { user_id, v_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mileage, setMileage] = useState();
  const [alert, sendAlert] = useState(false);
  const [alertType, setAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [returnVehicleProfiles, sendReturn] = useState(false)

  useEffect(() => {
    const fetchVehiclesMileage = async () => {
      try {
        const response = await axios.get(
          `https://capstone-ten-lyart.vercel.app/getMileage/${user_id}/${v_id}`
        );
        setMileage(response.data[0]);
        
      } catch (e) {
        return "Error: " + e
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
    dispatch(clearData())
    dispatch(clearAlert())
    try {
    const response = await axios.put(
      `https://capstone-ten-lyart.vercel.app/updateMileage/${user_id}/${v_id}`,
      {
        mileage,
      }
    );
    alerttUser(response)
    sendReturn(true);
    } catch(e) {
      return "Error: " + e

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
console.log("mileage:", mileage)
  return (
    <>      {alert && (
        <AlertTrigger alertType={alertType} alertMessage={alertMessage} />
      )}
    <div className="update-mileage-page">

      <div className="update-mileage-form-container">
      <form onSubmit={(e) => handleUpdatingVehicleMileage(e)} className="update-mileage-form">
        <label>
          Update Vehicle Mileage
          <input onChange={(e) => setMileage(e.target.value)} placeholder={mileage ? mileage.mileage : null}></input>
        </label>
        <div>
        <button className="button-82-pushable" role="button" type="submit">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">Submit</span>
        </button>
        </div>
      <div className="profiles-return-button-container">
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
      </form>       

      </div>      

    </div></>
  );
}

export default UpdateMileage;
