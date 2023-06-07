import axios from 'axios'
import { useParams } from 'react-router-dom'


export const saveVin = (vin) => {
    return {
        type: "SAVE_VIN",
        payload: vin
    }
}

export const saveMileage = (mileage) => {
    return {
        type: "SAVE_MILEAGE",
        payload: mileage
    }
}

//I would need the id of the repair to target which one. Then id have to grab each entity of that repairs record and save it to the global state variable.
//Fetch the repair record by id
// export const fetchRepairRecordValues = (values) => {
//     // const {id} = useParams()
//     // id = parseInt(id,10)

//     return (dispatch) => {
//         axios.get('http://localhost:5000/update/' +id , {id})
//     }
// }