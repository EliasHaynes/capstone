import React, { useEffect, useState } from "react";
import axios from "axios";
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

function RepairLog() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  const user_id = user.sub.split("|")[1].toString();

  const [repairs, setRepairs] = useState([]);
  const [currentVId, setCurrentVId] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchRepairData = async () => {
      try {
        const currentVehicleId = await fetchCurrentVehicle();
        const vehicleRepairs = await axios.get(
          `https://capstone-as3r.vercel.app/repair/${user_id}/${currentVehicleId}`
        );
        setRepairs(vehicleRepairs.data);
      } catch (error) {
        return "Error: " + error;
      }
    };

    fetchRepairData();
  }, [reload]);

  const fetchCurrentVehicle = async () => {
    try {
      const currentVehicleResponse = await axios.get(
        `https://capstone-as3r.vercel.app/getCurrentVehicle/${user_id}`
      );

      setCurrentVId(currentVehicleResponse.data[0].v_id);
      return currentVehicleResponse.data[0].v_id;
    } catch (e) {
      return "Error: " + e
    }
  };

  const handleDelete = async (repair_id) => {
    try {
      await axios.delete(`https://capstone-as3r.vercel.app/delete/${repair_id}`);
      const newArr = repairs.filter((rep) => rep.repair_id !== repair_id);
      setRepairs(newArr);

      setReload((currentState) => !currentState);
      return;
    } catch (e) {
      return "Error: " + e
    }
  };

  const onRepairDeleteReRender = () => {
    setReload((currentState) => !currentState);
  };


  return (
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
      {/* <Container maxWidth="lg" className="car-container">
        <div className="flex-container">
          <button
            class="button-82-pushable"
            onClick={() => navigate(`/create/${user_id}/${currentVId}`)}
          >
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">Add Repair</span>
          </button>
        </div>
        <Table className="repair-table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell>Maintenance Description</TableCell>
              <TableCell>Performed by</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Labor</TableCell>
              <TableCell>Other</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((rep, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell>
                  {new Date(rep.date).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>{rep.repair_mileage}</TableCell>
                <TableCell>{rep.maintenance}</TableCell>
                <TableCell>{rep.performed_by}</TableCell>
                <TableCell>{rep.material}</TableCell>
                <TableCell>{rep.labor}</TableCell>
                <TableCell>{rep.other}</TableCell>
                <TableCell>{rep.material + rep.labor + rep.other}</TableCell>
                <TableCell>
                  <EditIcon
                    onClick={() =>
                      navigate(
                        `/update/${user_id}/${currentVId}/${rep.repair_id}`
                      )
                    }
                  />
                  <DeleteIcon
                    // add onClick method here
                    onClick={() => {
                      handleDelete(rep.repair_id);
                      setReload((currentState) => !currentState);
                    }}
                    className="icon text-red"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container> */}
    </div>
  );
}

export default RepairLog;
