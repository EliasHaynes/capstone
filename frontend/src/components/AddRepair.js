import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'


function AddRepair() {
    const [mileage,setMileage] = useState(0)
    const [maintenance, setMaintenance] = useState('')
    const [performed_by,setPerformed_by] = useState('')
    const [contact,setContact] = useState('')
    const [material,setMaterial] = useState(0)
    const [labor,setLabor] = useState(0)
    const [other,setOther] = useState(0)

    const {
        isAuthenitcated,
        user
    } = useAuth0()

    const navigate = useNavigate()
    const useEffect = () => {
        axios.get()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const auth0_id = user.sub.split('|')[1]
        console.log(auth0_id, 'saving record under this auth0 id')
        axios.post('http://localhost:5000/create', {mileage,maintenance, performed_by, contact, material, labor, other, auth0_id })
        .then((res) => {
            console.log(res)
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
                    setPerformed_by(e.target.value)
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

            <button type='submit'>Add Repair</button>
        </form>
    )
}

export default AddRepair;


