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

    const handleDelete =  async (id) => {
        await axios.delete('http://localhost:5000/delete/'+id)
        .then(window.location.reload())
        .catch(err => console.log(err))
    }

    return (

        <div>
            <Link to='/create'>Add Repair+</Link>
            {
                student.map((stud,i) => (
                    <span key={i}>
                        <p>{stud.id}</p>
                        <p>{stud.first_name}</p>
                        <p>{stud.last_name}</p>
                        
                        <Link to={`update/${stud.id}`}>Update</Link>
                        <button onClick={e => handleDelete(stud.id)}>Delete</button>
                    </span>
                ))
            }
        </div>
        
    )
}

export default Student