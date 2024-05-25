import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import MaintenanceCard from "./MaintenanceCard";
import AlertTrigger from './AlertTrigger';
import Spinner from "./Spinner";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure, clearAlert } from '../redux/store'

function ScheduledMaintenance() {
  const navigate = useNavigate();
  const { isAutheticated, user } = useAuth0();
  const user_id = user.sub.split("|")[1].toString();

  //State
  const [currentVehicle, setCurrentVehicle] = useState();
  const [open, toggleOpen] = useState(false);
  const [difficultyColor, setDifficulty] = useState();
  const [active, setActive] = useState(null);

  //Redux State
  const dispatch = useDispatch();
  const { repairs, groupedRepairs, loading, alert, alertType, alertMessage } = useSelector(state => state.maintenance);
  
  //Env
  const token = process.env.REACT_APP_CAR_KEY;
  const key = process.env.REACT_APP_API_KEY;

  //Child Components
  const MileageThresholdHeading = ({ due_mileage }) => {
    return (
      <div className="scheduled-mileage-threshold-heading">
        <h4>Repairs @{due_mileage} miles</h4>
        <span></span>
      </div>
    );
  };

  //Assign each of the repairs a difficulty rating
  const groupCardsByMileageThreshold = (repairs) => {
    const grouped = {};

    repairs.forEach((repair) => {
      const mileage = repair.due_mileage;
      if (!grouped[mileage]) {
        grouped[mileage] = [];
      }
      grouped[mileage].push(repair);
    });
    return grouped;
  };


  // const handleClick = () => {
  //    const fetchVehicleData = async () => {
  //     try {
        
  //       const currentVehicleResponse = await axios.get(
  //         `https://capstone-ten-lyart.vercel.app/getCurrentVehicle/${user_id}`
  //       );
  //       const mileage = await currentVehicleResponse.data[0].mileage;
  //       const vin = await currentVehicleResponse.data[0].vin;



  //       const response = await axios.get(
  //         `https://api.carmd.com/v3.0/maint?vin=${vin}&mileage=${mileage}`,
  //         {
  //           headers: {
  //             authorization: token,
  //             "partner-token": key,
  //           },
  //         }
  //       );
  //       if (response.data.data.length === 0) {
  //         console.log("if ran")
  //         sendAlert(true);
  //         setAlert("error");
  //         setAlertMessage("Unfortunately there is no repair data for your vehicle. May be too old or new.")
  //       }
  //       const grouped = groupCardsByMileageThreshold(response.data.data);
  //       setGroupedRepairs(grouped);
  //       setRepairs(response.data.data);
  //       isLoading(false);
  //     } catch (error) {
  //       return "Error: " + error
  //     }
  //   };
  //   fetchVehicleData();
  // };

  const handleClick = async () => {
    dispatch(fetchDataStart());
    try {
      const currentVehicleResponse = await axios.get(`https://capstone-ten-lyart.vercel.app/getCurrentVehicle/${user_id}`);
      const mileage = currentVehicleResponse.data[0].mileage;
      const vin = currentVehicleResponse.data[0].vin;

      const response = await axios.get(`https://api.carmd.com/v3.0/maint?vin=${vin}&mileage=${mileage}`, {
        headers: { authorization: token, "partner-token": key }
      });

      if (response.data.data.length === 0) {
        dispatch(fetchDataFailure("Unfortunately there is no repair data for your vehicle. May be too old or new."));
      } else {
        const grouped = groupCardsByMileageThreshold(response.data.data);
        dispatch(fetchDataSuccess({ repairs: response.data.data, groupedRepairs: grouped }));
      }
    } catch (error) {
      dispatch(fetchDataFailure("Error: " + error.message));
    }
  };


  return (
    <div className="scheduled-maintenance-page">
            {alert && (
        <AlertTrigger alertType={alertType} alertMessage={alertMessage} />
      )}
      <div className="scheduled-heading">
        <h1>Get Relative Scheduled Maintenance</h1>
        <p>within -+10,000 miles of vehicle mileage</p>

        <button class="button-82-pushable"  onClick={() => {
            toggleOpen(true);
            handleClick();
          }}>
  <span class="button-82-shadow"></span>
  <span class="button-82-edge"></span>
  <span class="button-82-front text">
  See Repairs
  </span>
</button>
      </div>
      { loading ? <Spinner></Spinner> : (
      
        <div className="scheduled-mileage-threshold">
          {Object.entries(groupedRepairs).map(
            ([mileage, repairsInGroup], idx) => (
              <div key={idx}>
                <MileageThresholdHeading due_mileage={mileage} />
                <div className="maintenance-cards">
                  {repairsInGroup.map((rep, repIdx) => (
                    <div className="card">
                      <MaintenanceCard
                        key={repIdx}
                        onClick={() => setActive(repIdx)}
                        className={`card ${active == repIdx && 'is-active'}`}
                        repairDesc={rep.desc}
                        repairMileage={rep.due_mileage}
                        repairLabor={rep.repair ? rep.repair.labor_cost : 0}
                        repairDifficulty={
                          rep.repair ? rep.repair.repair_difficulty : 0
                        }
                        parts={rep.parts}
                        
                      />
                      </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
                      )}
    </div>
  );
}

export default ScheduledMaintenance;
