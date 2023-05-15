import React, {useEffect,useState} from "react"
import axios from 'axios'
import { Link, Navigate, useNavigate} from "react-router-dom"
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


function RepairLog() {
    const navigate = useNavigate()
    const [repairs,setRepairs] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:5000/repair')
        .then((res) => {
            setRepairs(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleDelete =  async (id) => {
        await axios.delete('http://localhost:5000/delete/'+id)
        .then(window.location.reload())
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
                <TableRow key={rep.idx}>
                    <TableCell component="th" scope="row">
                        {rep.idx}
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
                        <DeleteIcon
                            // add onClick method here
                            onClick={e => handleDelete(rep.id)}
                            className="icon text-red" />
                        <EditIcon>
                            <Link to={`update/${rep.id}`} />
                        </EditIcon>
                            
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