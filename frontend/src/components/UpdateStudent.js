import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'


function UpdateStudent() {
    const [fName,setFName] = useState('')
    const [lName, setLName] = useState('')
    const navigate = useNavigate()

    const {id} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:5000/update/' +id, {id,fName,lName})
        .then((res) => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))

    }
    console.log()
    return (

        <form onSubmit={handleSubmit}>
            <h2>Update Student</h2>
            <input 
                name='firstName' 
                placeholder='first name'
                onChange={(e) => {
                    setFName(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <input 
                name='lastName'
                placeholder='last name'
                onChange={(e) => {
                    setLName(e.target.value)
                    console.log(e.target.value)
                }}>
            </input>
            <button type='submit'>Update</button>
        </form>
    )
}

export default UpdateStudent