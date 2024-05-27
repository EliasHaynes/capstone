import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRepair from "./AddRepair";
import { useAuth0 } from "@auth0/auth0-react";
import StickyHeadTable from "./RepairTable";
import NoRegisteredCarsMessage from "./NoRegisteredCarsMessage";

function RepairLog() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const user_id = user.sub.split("|")[1].toString();

  const [repairs, setRepairs] = useState([]);
  const [currentVId, setCurrentVId] = useState(null);
  const [reload, setReload] = useState(false);
  const [hasRegisteredVehicle, setHasRegisteredVehicle] = useState(null);

  //Check first if user has registered vehicles. If so proceed to retrieving users current vehicles id and its repairs.
  useEffect(() => {
    const fetchRepairData = async () => {
      try {
      await checkForRegisteredVehicles();
        const currentVehicleId = await fetchCurrentVehicle();
        const vehicleRepairs = await axios.get(
          `https://capstone-ten-lyart.vercel.app/repair/${user_id}/${currentVehicleId}`
        );
        setRepairs(vehicleRepairs.data);
      } catch (error) {
        return "Error: " + error;
      }
    };

    fetchRepairData();
    //When user deletes a repair the dependency will trigger to rerender page.
  }, [reload]);

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

  //Retrive users current vehicle
  const fetchCurrentVehicle = async () => {
    try {
      const currentVehicleResponse = await axios.get(
        `https://capstone-ten-lyart.vercel.app/getCurrentVehicle/${user_id}`
      );
      setCurrentVId(currentVehicleResponse.data[0].v_id);
      return currentVehicleResponse.data[0].v_id;
    } catch (e) {
      return "Error: " + e;
    }
  };

  //Handle deleting repair data
  const handleDelete = async (repair_id) => {
    try {
      await axios.delete(
        `https://capstone-ten-lyart.vercel.app/delete/${repair_id}`
      );
      const newArr = repairs.filter((rep) => rep.repair_id !== repair_id);
      setRepairs(newArr);

      setReload((currentState) => !currentState);
      return;
    } catch (e) {
      return "Error: " + e;
    }
  };

  //When user deletes a repair trigger a rerender with 'reload' state variable.
  const onRepairDeleteReRender = () => {
    setReload((currentState) => !currentState);
  };


  return (
    <div>
      {/* Display based on condition on user having a registered vehicle */}
      {!hasRegisteredVehicle ? (
        <NoRegisteredCarsMessage />
      ) : (
        <div>
          <button
            class="button-82-pushable"
            onClick={() => navigate(`/create/${user_id}/${currentVId}`)}
          >
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">Add Repair</span>
          </button>
          <StickyHeadTable
            repairs={repairs}
            navigate={navigate}
            handleDelete={handleDelete}
            currentVId={currentVId}
            userId={user_id}
            reRenderPage={onRepairDeleteReRender}
          ></StickyHeadTable>
        </div>
      )}
    </div>
  );
}

export default RepairLog;
