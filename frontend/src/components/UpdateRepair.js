import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'


function UpdateRepair() {
    const [mileage,setMileage] = useState(0)
    const [maintenance, setMaintenance] = useState('')
    const [performedBy,setPerformedBy] = useState('')
    const [contact,setContact] = useState('')
    const [material,setMaterial] = useState(0)
    const [labor,setLabor] = useState(0)
    const [other,setOther] = useState(0)

    
    let {id} = useParams();
    id = parseInt(id,10)
    console.log("THE ID:", id)
   

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:5000/update/' +id, {id,mileage,maintenance, performedBy, contact, material, labor, other })
        .then((res) => {
            console.log("The PUT:", res)
            navigate('/repair')

        })
        .catch(err => console.log(err))

    }
    console.log()
    return (
        <form onSubmit={handleSubmit}>
            <input 
                name='mileage' 
                placeholder='mileage'
                onChange={(e) => {
                    setMileage(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='maintenance'
                placeholder='maintenance'
                onChange={(e) => {
                    setMaintenance(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='performedBy'
                placeholder='performedBy'
                onChange={(e) => {
                    setPerformedBy(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='contact'
                placeholder='contact'
                onChange={(e) => {
                    setContact(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='material'
                placeholder='material'
                onChange={(e) => {
                    setMaterial(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='labor'
                placeholder='labor'
                onChange={(e) => {
                    setLabor(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='other'
                placeholder='other'
                onChange={(e) => {
                    setOther(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>

            <button type='submit'>Update</button>
        </form>
    )
}

export default UpdateRepair;
