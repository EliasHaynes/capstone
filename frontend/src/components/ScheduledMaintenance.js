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
import NoRegisteredCarsMessage from "./NoRegisteredCarsMessage";

function ScheduledMaintenance() {
  const { user } = useAuth0();
  const user_id = user.sub.split("|")[1].toString();

  const repairs = [
    {
        "desc": "Change Engine Oil and Filter",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0.4,
            "labor_rate_per_hour": 101.44,
            "part_cost": 65.16,
            "labor_cost": 40.57,
            "misc_cost": 25,
            "total_cost": 130.73
        },
        "parts": [
            {
                "desc": "Engine Oil Filter",
                "manufacturer": "",
                "price": 10.16,
                "qty": 1
            },
            {
                "desc": "Engine Oil",
                "manufacturer": "",
                "price": 11,
                "qty": 5
            }
        ]
    },
    {
        "desc": "Change Transfer Case Fluid",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0.5,
            "labor_rate_per_hour": 101.44,
            "part_cost": 31.3,
            "labor_cost": 50.72,
            "misc_cost": 25,
            "total_cost": 107.02
        },
        "parts": [
            {
                "desc": "Differential Oil",
                "manufacturer": "",
                "price": 31.3,
                "qty": 1
            }
        ]
    },
    {
        "desc": "Change Transmission Fluid and Filter",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 1,
            "labor_rate_per_hour": 101.44,
            "part_cost": 445.4,
            "labor_cost": 101.44,
            "misc_cost": 25,
            "total_cost": 571.84
        },
        "parts": [
            {
                "desc": "Automatic Transmission Seal Kit",
                "manufacturer": "",
                "price": 418.45,
                "qty": 1
            },
            {
                "desc": "Automatic Transmission Fluid",
                "manufacturer": "",
                "price": 3.85,
                "qty": 7
            }
        ]
    },
    {
        "desc": "Inspect Accelerator Pedal Position Assembly",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 166.21,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 166.21
        },
        "parts": null
    },
    {
        "desc": "Inspect Air Filter",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 0,
            "repair_hours": 0,
            "labor_rate_per_hour": 0,
            "part_cost": 0,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 0
        },
        "parts": null
    },
    {
        "desc": "Inspect Brake Linings and Hoses",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 256.6,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 256.6
        },
        "parts": null
    },
    {
        "desc": "Inspect Cooling System",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 1,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 17.59,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 17.59
        },
        "parts": null
    },
    {
        "desc": "Inspect For Fluid Leaks",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 11,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 11
        },
        "parts": null
    },
    {
        "desc": "Inspect Fuel System",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 34.22,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 34.22
        },
        "parts": null
    },
    {
        "desc": "Inspect Parking Brake Operation & Tension",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 1,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 256.6,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 256.6
        },
        "parts": null
    },
    {
        "desc": "Inspect Spark Plug Wires",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 1,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 82.04,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 82.04
        },
        "parts": null
    },
    {
        "desc": "Inspect SRS System",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 1,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 825,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 825
        },
        "parts": null
    },
    {
        "desc": "Inspect Steering & Suspension Components",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 99.87,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 99.87
        },
        "parts": null
    },
    {
        "desc": "Inspect Wiper & Washer System",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 1,
            "repair_hours": 0,
            "labor_rate_per_hour": 101.44,
            "part_cost": 7.13,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 7.13
        },
        "parts": null
    },
    {
        "desc": "Lube Chassis, Suspension and Steering Systems",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0.2,
            "labor_rate_per_hour": 101.44,
            "part_cost": 14.23,
            "labor_cost": 20.28,
            "misc_cost": 25,
            "total_cost": 59.51
        },
        "parts": [
            {
                "desc": "Multi Purpose Lubricant",
                "manufacturer": "",
                "price": 14.23,
                "qty": 1
            }
        ]
    },
    {
        "desc": "Replace Spark Plugs",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 2,
            "repair_hours": 0.9,
            "labor_rate_per_hour": 101.44,
            "part_cost": 52.36,
            "labor_cost": 91.29,
            "misc_cost": 25,
            "total_cost": 168.65
        },
        "parts": [
            {
                "desc": "Spark Plug",
                "manufacturer": "",
                "price": 13.09,
                "qty": 4
            }
        ]
    },
    {
        "desc": "Rotate Tires, Inspect Tire Wear, & Adjust Tire Pressure",
        "due_mileage": 97500,
        "due_km": 0,
        "is_oem": true,
        "repair": {
            "repair_difficulty": 0,
            "repair_hours": 0,
            "labor_rate_per_hour": 0,
            "part_cost": 0,
            "labor_cost": 0,
            "misc_cost": 0,
            "total_cost": 0
        },
        "parts": null
    }
]

const arrayOfCardDescs = repairs.map(repair => repair.desc)
  //State
  const [open, toggleOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [hasRegisteredVehicle, setHasRegisteredVehicle] = useState(null);

  //Redux State
  const dispatch = useDispatch();
  const {  groupedRepairs, loading, alert, alertType, alertMessage } = useSelector(state => state.maintenance);
  
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

  //Check if user has a registered vehicle on render
  useEffect(() => {
    const doesUserHaveRegisteredVehicle = async () => {
      await checkForRegisteredVehicles();
    }
    doesUserHaveRegisteredVehicle()
  }, [])

    //Check if user has registered a vehicle
    const checkForRegisteredVehicles = async () => {
      try {
        const allVehiclesResponse = await axios.get(
          `https://capstone-ten-lyart.vercel.app/getVehicles/${user_id}`
        );
        if (allVehiclesResponse.data.length === 0) {
          setHasRegisteredVehicle(false);
        } else {
          setHasRegisteredVehicle(true)
        }
        return allVehiclesResponse.data;
      } catch (e) {
        return "Error" + e;
      }
    };

  //Seperate repairs by mileage thresholds
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

  //Retrieve users current vehicle vin to serve API data
  const handleClick = async () => {
    dispatch(fetchDataStart());
    try {
      const currentVehicleResponse = await axios.get(`https://capstone-ten-lyart.vercel.app/getCurrentVehicle/${user_id}`);
      const mileage = currentVehicleResponse.data[0].mileage;
      const vin = currentVehicleResponse.data[0].vin;

      // const response = await axios.get(`https://api.carmd.com/v3.0/maint?vin=${vin}&mileage=${mileage}`, {
      //   headers: { authorization: token, "partner-token": key }
      // });

      // if (response.data.data.length === 0) {
        if (repairs.length === 0) {
        dispatch(fetchDataFailure("Unfortunately there is no repair data for your vehicle. May be too old or new."));
      } else {
        // const grouped = groupCardsByMileageThreshold(response.data.data);
        const grouped = groupCardsByMileageThreshold(repairs);
        // dispatch(fetchDataSuccess({ repairs: response.data.data, groupedRepairs: grouped }));
        dispatch(fetchDataSuccess({ repairs: repairs, groupedRepairs: grouped }));
      }
    } catch (error) {
      dispatch(fetchDataFailure("Error: " + error.message));
    }
  };


  return (
    <>
    {/* {!hasRegisteredVehicle ? 
    <NoRegisteredCarsMessage/>
    : */}
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
                        repair={rep}
                        repairID={repIdx}
                        repairDifficulty={
                          rep.repair ? rep.repair.repair_difficulty : 0
                        }
                        parts={rep.parts}
                        repairDescs={arrayOfCardDescs}
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
    {/* } */}
    </>
  );
}

export default ScheduledMaintenance;
