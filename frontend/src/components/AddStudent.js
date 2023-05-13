import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function AddStudent() {
    const [fName,setFName] = useState('')
    const [lName, setLName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/create', {fName,lName})
        .then((res) => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))

    }
    console.log()
    return (
        <form onSubmit={handleSubmit}>
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
            <button type='submit'></button>
        </form>
    )
}

export default AddStudent;


