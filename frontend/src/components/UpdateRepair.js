import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { autocompleteClasses } from '@mui/material'


function UpdateRepair() {
    const [mileage,setMileage] = useState(0)
    const [maintenance, setMaintenance] = useState('')
    const [performed_by,setPerformed_by] = useState('')
    const [contact,setContact] = useState('')
    const [material,setMaterial] = useState(0)
    const [labor,setLabor] = useState(0)
    const [other,setOther] = useState(0)
    const [repair,setRepair] = useState({})

    console.log("The repair state:", repair)

    const navigate = useNavigate()


    let {user_id,v_id,repair_id} = useParams();
    console.log(`user id in param: ${user_id} and repair_id in param: ${repair_id}`)




    useEffect(() => {
        const fetchRepairDataById = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/repair/${repair_id}`);
            console.log("THE RESPONSE:", response)
                setRepair(response.data[0])
                setMileage(response.data[0].repair_mileage);
                setMaintenance(response.data[0].maintenance);
                setPerformed_by(response.data[0].performed_by);
                setContact(response.data[0].contact);
                setMaterial(response.data[0].material);
                setLabor(response.data[0].labor);
                setOther(response.data[0].other);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchRepairDataById();
    },[])


      
      
      
      
      
      
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/update/${user_id}/${repair_id}`, {mileage,maintenance, performed_by, contact, material, labor,other,v_id})
            navigate(`/repair`)
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div className="repair-forms-container">
            <h1>Update Repair</h1>
        <form onSubmit={handleSubmit} className="repair-forms">
            <input 
                name='mileage' 
                placeholder={repair.repair_mileage}
                onChange={(e) => {
                    setMileage(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='maintenance'
                placeholder={repair.maintenance}
                onChange={(e) => {
                    setMaintenance(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='performedBy'
                placeholder={repair.performed_by}
                onChange={(e) => {
                    setPerformed_by(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='material'
                placeholder={repair.material}
                onChange={(e) => {
                    setMaterial(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='labor'
                placeholder={repair.labor}
                onChange={(e) => {
                    setLabor(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='other'
                placeholder={repair.other}
                onChange={(e) => {
                    setOther(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <button class="button-82-pushable" role="button" type="submit">
                  <span class="button-82-shadow"></span>
                  <span class="button-82-edge"></span>
                  <span class="button-82-front text">Update Repair</span>
                </button>
        </form>
        </div>
    )
}

export default UpdateRepair;

