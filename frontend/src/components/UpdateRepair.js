import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'


function UpdateRepair() {
    const [mileage,setMileage] = useState(0)
    const [maint, setMaintenance] = useState('')
    const [performedBy,setPerformedBy] = useState('')
    const [contact,setContact] = useState('')
    const [material,setMaterial] = useState(0)
    const [labor,setLabor] = useState(0)
    const [other,setOther] = useState(0)
    const [repair,setRepair] = useState({})

    console.log("The repair state:", repair)

    const navigate = useNavigate()
    const {
        isAuthenticated,
        getAccessTokenSilently
      } = useAuth0()

    let {id} = useParams();
    id = parseInt(id,10)
    console.log("THE ID:", id)


    useEffect(() => {
        const fetchRepairDataById = async () => {
            try {           
                const token = await getAccessTokenSilently();
                const response = await axios.get(`https://capstone-kohl.vercel.app/repair/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            });
            console.log("THE RESPONSE:", response)
                setRepair(response.data[0])
                console.log("REPAIR BY ID:", response.data[0])
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchRepairDataById();
    },[])

    

   

   

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('https://capstone-kohl.vercel.app/update/' +id, {id,mileage,maint, performedBy, contact, material, labor, other })
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
                placeholder={repair.mileage}
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
                placeholder={repair.performedBy}
                onChange={(e) => {
                    setPerformedBy(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='contact'
                placeholder={repair.contact}
                onChange={(e) => {
                    setContact(e.target.value)
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

            <button type='submit'>Update</button>
        </form>
    )
}

export default UpdateRepair;

