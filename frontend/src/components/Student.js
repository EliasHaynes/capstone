import React, {useEffect,useState} from "react"
import axios from 'axios'

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
            {
                student.map((stud,i) => (
                    <span key={i}>
                        <p>{stud.id}</p>
                        <p>{stud.first_name}</p>
                        <p>{stud.last_name}</p>
                    </span>
                ))
            }
        </div>
        
    )
}

export default Student