import React, {useEffect,useState} from "react"
import axios from 'axios'
import { Link, Navigate, useNavigate, useParams} from "react-router-dom"
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import AddRepair from "./AddRepair";
import { useAuth0 } from "@auth0/auth0-react";


function RepairLog() {
    const navigate = useNavigate()
    const {
        isAuthenticated,
        getAccessTokenSilently
      } = useAuth0()

    const [repairs,setRepairs] = useState([])

    useEffect(() => {
        const fetchRepairData = async () => {
          try {
            const token = await getAccessTokenSilently();
            const response = await axios.get('http://localhost:5000/repair', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setRepairs(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchRepairData();
      }, []);

    

    const handleDelete =  (id) => {        
        axios.delete('http://localhost:5000/delete/'+id)
        .then(setRepairs(repairs.filter(rep => rep.id !== id)))
        .catch(err => console.log(err))
    }

    
    return (
        <div>
        <Container maxWidth="lg" className="car-container">
        <div className="flex-container">
            <button onClick={() => navigate('/create')}>Add Repair</button>
        </div>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Mileage</TableCell>
                    <TableCell>Maintenance Description</TableCell>
                    <TableCell>Performed by</TableCell>
                    <TableCell>Contact #</TableCell>
                    <TableCell>Material</TableCell>
                    <TableCell>Labor</TableCell>
                    <TableCell>Other</TableCell>
                    <TableCell>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {repairs.map((rep,idx) => (
                <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                        {idx +1}
                    </TableCell>
                    <TableCell>{rep.date}</TableCell>
                    <TableCell>{rep.mileage}</TableCell>
                    <TableCell>{rep.maintenance}</TableCell>
                    <TableCell>{rep.performedBy}</TableCell>
                    <TableCell>{rep.contact}</TableCell>
                    <TableCell>{rep.material}</TableCell>
                    <TableCell>{rep.labor}</TableCell>
                    <TableCell>{rep.other}</TableCell>
                    <TableCell>{rep.material + rep.labor + rep.other}</TableCell>
                    <TableCell>
                        <EditIcon onClick={() => navigate(`/update/${rep.id}`)}/>
                        <DeleteIcon
                            // add onClick method here
                            onClick={() => handleDelete(rep.id)}
                            className="icon text-red" />
                        
                        
                            
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Container>
        </div>
        
    )
}

export default RepairLog