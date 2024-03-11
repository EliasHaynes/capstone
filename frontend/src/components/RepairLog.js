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

function RepairLog() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  const user_id = user.sub.split("|")[1].toString();

  const [repairs, setRepairs] = useState([]);
  const [currentVId, setCurrentVId] = useState(null);

  useEffect(() => {
    const fetchRepairData = async () => {
      try {
        const currentVehicleId = await fetchCurrentVehicle();
        console.log("The v id:", currentVehicleId);
        const vehicleRepairs = await axios.get(
          `http://localhost:5000/repair/${user_id}/${currentVehicleId}`
        );
        console.log("the data:", vehicleRepairs.data);
        setRepairs(vehicleRepairs.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRepairData();
  }, []);

  const fetchCurrentVehicle = async () => {
    try {
      const currentVehicleResponse = await axios.get(
        `http://localhost:5000/getCurrentVehicle/${user_id}`
      );

      setCurrentVId(currentVehicleResponse.data[0].v_id);
      return currentVehicleResponse.data[0].v_id;
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (v_id) => {
    axios
      .delete(`http://localhost:5000/delete/` + v_id)
      .then((response) => {
        const newArr = repairs.filter((rep) => rep.v_id !== v_id);
        setRepairs(newArr);
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div>
      <Container maxWidth="lg" className="car-container">
        <div className="flex-container">
          <button onClick={() => navigate(`/create/${user_id}/${currentVId}`)}>
            Add Repair
          </button>
        </div>
        <Table>
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
                <TableCell>{rep.date}</TableCell>
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
                      navigate(`/update/${user_id}/${currentVId}/${rep.repair_id}`)
                    }
                  />
                  <DeleteIcon
                    // add onClick method here
                    onClick={() => handleDelete(rep.v_id)}
                    className="icon text-red"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default RepairLog;
