import React, {useEffect,useState} from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

function Student() {
    const [student,setStudent] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:5000/')
        .then((res) => {
            setStudent(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    console.log("student:", student)

    return (

        <div>
            <Link to='/create'>Add Repair+</Link>
            {
                student.map((stud,i) => (
                    <span key={i}>
                        <p>{stud.id}</p>
                        <p>{stud.first_name}</p>
                        <p>{stud.last_name}</p>
                        
                        <Link to='/update'>Update</Link>
                        <Link to='/delete'>Delete</Link>
                    </span>
                ))
            }
        </div>
        
    )
}

export default Student